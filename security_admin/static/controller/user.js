
Ext.define('etecsa.controller.user', {
    extend: 'Ext.app.Controller',
    control: {
        'user-grid': {
            itemcontextmenu: "contextual_menu",
            afterrender: "after_render_grid",
            resize: "resize"
        },
        'user-grid button[iconCls=x-fa fa-user-plus]': {
            click: "show_window"
        },
        'user-grid button[iconCls=x-fa fa-user-times]': {
            click: "confirm_remove"
        },
        '#checkcolumn-permission': {
            checkchange: "check_change"
        },
        // Form Add User
        'user-window': {
            afterrender: "after_render_window"
        },
        'user-window [xtype=combobox]': {
            select: "filter_store"
        },
        'user-window button[iconCls=x-fa fa-trash]': {
            click: "clear_filter"
        },
        'user-window button[iconCls=x-fa fa-download]': {
            click: "is_valid_selection"
        },
        // Menu
        'user-menu': {
            'edit_user': "show_edit_user_window",
            'active_inactive_user': "active_inactive_user",
            'show_permission_window': "show_permission_window",
            'access_level': "show_access_level_window"
        },
        // Edit User
        'edit-user-window [text=Salvar]': {
            click: "is_valid_edit_form"
        },
        // Edit Access Level
        'access-level-window [text=Salvar]': {
            click: "is_valid_access_level"
        }
    },
    resize: function (grid) {
        var center = Ext.getCmp('center-region-id');
        grid.setHeight(center.getHeight());
    },
    after_render_grid: function (grid) {
        this.grid = grid;
        this.store = grid.store;
    },
    show_window: function () {
        Ext.create('etecsa.view.user.form')
    },
    after_render_window: function (window) {
        this.window = window;
        this.window.grid = window.down('grid');
        this.window.store = window.store;
    },
    filter_store: function (combobox) { var me = this;
        this.window.store.clearFilter();
        if (combobox.value) {
            me.window.store.filter({
                property: 'uo_id',
                value: combobox.value,
                anyMatch: true
            });
        }
    },
    clear_filter: function () {
        this.window.store.clearFilter();
    },
    is_valid_selection: function () { var me=this;
        if(me.window.grid.selModel.getCount() >= 1) {
            me.add_user(me.window.grid.selModel.getSelection())
        } else {
            Me.msg.question('<b>Por favor:</b> selecione los trabajadores que decee convertir en usuarios.');
        }
    },
    add_user: function (selection) {
        var me = this, data = [];

        Ext.Array.each(selection, function (row) {
            data.push([row.get('id'), row.get('username')]);
        });
        Ext.Ajax.request({
                url: '/security_admin/user/load_new_user',
                params: {
                    data: Ext.encode(data)
                },
                success: function (response) {
                    if (response.responseText === 'OK') {
                        me.store.reload();
                        me.window.close();
                        Me.show_toast('Operación realizada exitosamente.');
                    } else {
                        Me.msg.warning(response.responseText);
                    }
                },
                failure: function(response) {
                    Me.msg.warning(response.responseText);
                }
            });
    },
    confirm_remove: function () {
        if (this.grid.selModel.getCount() >= 1) {
            Ext.MessageBox.confirm('Confirmación', 'Desea eliminar los registro seleccionado?', confirm, this);
        } else {
             Me.msg.question('Seleccione los registro que desea eliminar.');
        }
        function confirm (btn) {
            if (btn === 'yes') {
                this.remove();
            }
        }
    },
    remove: function () { var me = this, ids = [];
        Ext.Array.each(this.grid.selModel.getSelection(), function (row) {
            ids.push(row.get('id'));
        });
        Ext.Ajax.request({
            url: '/security_admin/user/remove',
            params: { ids:  Ext.encode(ids) },
            success: function(response) {
                if (response.responseText === '') {
                    Me.show_toast('Operación realizada exitosamente.');
                    me.store.reload();
                } else {
                    Me.msg.warning(response.responseText);
                }
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    contextual_menu: function (view, record, item, index, e, eOpts) { var me = this;
        var menu = Ext.create('etecsa.view.user.menu', {
            me_record: record,
            me_grid: me.grid
        });
        menu.showAt(e.getXY());
        e.stopEvent();
    },
    // Edit user
    show_edit_user_window: function (record) {
        Ext.create('etecsa.view.user.edit_user', {
            me_record: record
        });
    },
    is_valid_edit_form: function (button) {
        var window = button.up('window'), form = window.down('form');
        if (form.getForm().isValid()) {
            this.edit_user(form, window);
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    edit_user: function (form, window) { var me = this;
        form.submit({
            success: function() {
                me.store.reload();
                window.close();
                Me.show_toast('Operación realizada exitosamente.');
            },
            failure: function(form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    // Active inactive User
    active_inactive_user: function (record) { var me = this;
        if (record.get('access_level') === "" && record.get('is_active') === false) {
            Me.msg.question('<b><span style="color:red;">Operación no Válida.</span></b> Asegúrese de asignar un <b>Nivel de Acceso</b> al usuario antes de activarlo.')
        } else {
           Ext.Ajax.request({
                url: '/security_admin/user/active_inactive_user',
                params: { id:  record.get('id') },
                success: function(response) {
                    if (response.responseText === '') {
                        me.store.reload();
                    } else {
                        Me.msg.warning(response.responseText);
                    }
                },
                failure: function(response){
                    Me.msg.error(response.responseText);
                }
            });
        }
    },
    // Add/Remove Permission
    show_permission_window: function (record) {
        Ext.create('etecsa.view.user.permission_user', {
            user_id: record.get('id')
        });
    },
    check_change: function (checkColumn, rowIndex, checked, record) {
        var me = this, window = checkColumn.up('window');
        Ext.Ajax.request({
            url: '/security_admin/user/permission_add',
            params: {
                id: record.get('id'),
                user_id: window.user_id,
                has_perm: checked
            },
            success: function(){
                window.permission_store.reload();
                me.store.reload();
            },
            failure: function(response){
                Me.msg.warning(response.responseText);
            }
        });
    },
    // Add/Edit Access Level
    show_access_level_window: function (record) {
        Ext.create('etecsa.view.user.access_level', {
            user_id: record.get('id')
        });
    },
    is_valid_access_level: function (button) {
        var window = button.up('window'), form = window.down('form');
        if (form.getForm().isValid()) {
            this.access_level(form, window);
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    access_level: function (form, window) { var me = this;
        form.submit({
            success: function() {
                me.store.reload();
                window.close();
                Me.show_toast('Operación realizada exitosamente.');
            },
            failure: function(form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    }
});


