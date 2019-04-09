
Ext.define('etecsa.controller.to_generadas.generadas', {
    extend: 'Ext.app.Controller',
    control: {
        'generadas-pendiente-grid': {
            destroy: 'close_progressbarpager',
            resize: "resize",
            afterrender: "after_render_grid",
            cellcontextmenu: "cell_context_menu"
        },
        'generadas-pendiente-grid [text=Crear (TO)]': {
            click: "show_form"
        },
        'generadas-pendiente-grid [iconCls=fa fa-filter]': {
            click: "clear_filter"
        },
        'generadas-pendiente-grid [xtype=combobox]': {
            select: "add_categoria_filter"
        },
        'generadas-pendiente-grid [id=fecha-start-date]': {
            select: "add_fechas_filter"
        },
        'generadas-pendiente-grid [id=fecha-ended-date]': {
            select: "add_fechas_filter"
        },
        'generadas-pendiente-grid [iconCls=x-fa fa-send]': {
            click: "confirm_action_grid"
        },
        'generadas-pendiente-grid [iconCls=x-fa fa-archive]': {
            click: "confirm_action_grid"
        },
        'generadas-pendiente-grid [iconCls=x-fa fa-edit]': {
            click: "confirm_action_grid"
        },
        'generadas-pendiente-grid [iconCls=x-fa fa-trash]': {
            click: "confirm_action_grid"
        },
        // Window - Form
        'to-generadas-window': {
            afterrender: "after_render_window"
        },
        'to-generadas-window [text=Crear]': {
            click: "is_valid"
        },
        'to-generadas-window [text=Editar]': {
            click: "is_valid"
        },
        // MENUs
        'tarea-operativa-menu': {
            'publicar_tarea_action': "publicar_tarea",
            'archivar_tarea_action': "archivar_tarea",
            'editar_tarea_action': "show_edit_form",
            'eliminar_tarea_action': "confirm_remove"
        },
        'prorroga-menu': {
            'prorroga_action': "show_prorroga"
        },
        'periodo-chequeo-menu': {
            'periodo_action': "show_periodo_chequeo"
        },
        'ejecutante-menu': {
            'ejecutante_action': "show_ejecutantes"
        },
        'adjunto-menu': {
            'adjunto_action': "show_adjuntos"
        }
    },
    resize: function (grid) {
        var center = Ext.getCmp('center-tabpanel-region-id');
        grid.setHeight(center.getHeight() - 50);
        this.position(grid);
    },
    position: function (grid) {
        var viewport = Ext.getCmp('center-tabpanel-region-id');
        grid.progressbarpager.setPosition(viewport.getWidth() - 640, viewport.getHeight() - 7);
        grid.progressbarpager.show();
    },
    after_render_grid: function (grid) {
        this.grid = grid;
        this.store = grid.getStore();
        this.combobox = grid.down('[xtype=combobox]');
        this.fecha_start = grid.down('[id=fecha-start-date]');
        this.fecha_ended = grid.down('[id=fecha-ended-date]');
        this.position(grid);
    },
    after_render_window: function (window) {
        this.window = window;
        this.form = window.down('form');
    },
    close_progressbarpager: function (grid) {
        grid.progressbarpager.close();
    },
    // Add / Edit Tarea Operativa
    show_form: function () {
        var win = Ext.create('etecsa.view.tareas_op.to_generadas_form',{
            title: 'Crear Tarea Operativa',
            button_text: 'Crear',
            url: '/tarea_operativa/to/generadas_add'
        });
        win.show();
    },
    show_edit_form: function (record) {
        var win = Ext.create('etecsa.view.tareas_op.to_generadas_form', {
            title: 'Editar Tarea Operativa',
            button_text: 'Editar',
            url: '/tarea_operativa/to/generadas_edit',
            tarea_id: record.get('id')
        });
        win.down('form').loadRecord(record);
        win.show();
    },
    is_valid: function () {
        if (this.form.getForm().isValid()) {
            this.submit_form();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    submit_form: function () { var me = this;
        this.form.submit({
            success: function() {
                me.store.reload();
                me.form.up('window').close();
                Me.show_toast('Operación realizada exitosamente.');
            },
            failure: function(form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    // button grid toolbar
    confirm_action_grid: function (button) {
        var record = this.grid.selModel.getSelection()[0];
        if (this.grid.selModel.getCount() > 0) {
            if (button.iconCls === 'x-fa fa-send') {
                this.publicar_tarea(record);
            }
            if (button.iconCls === 'x-fa fa-archive') {
                this.archivar_tarea(record);
            }
            if (button.iconCls === 'x-fa fa-edit') {
                this.show_edit_form(record);
            }
            if (button.iconCls === 'x-fa fa-trash') {
                this.confirm_remove(record);
            }
        } else {
            Me.msg.question('Usted debe seleccionar un registro.<br> Para poder ejecutar esta acción');
        }
    },
    // Publicar Tarea Operativa
    publicar_tarea: function (record) { var me = this;
        if (record.get('periodo_chequeo') === '-' || record.get('ejecutante_length') === 0) {
            Me.msg.question('<b><span style="color:red;">Operación no Válida.</span></b> Asegúrese de asignar <b>Ejecutantes</b> y <b>Periodo de Chequeo</b> antes de publicar la Tarea Operativa.')
        } else {
            Ext.Ajax.request({
                url: '/tarea_operativa/to/generadas_publicar',
                params: { id: record.get('id') },
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
        }
    },
    // Archivar
    archivar_tarea: function (record) { var me = this;
        if (record.get('periodo_chequeo') === '-' || record.get('ejecutante_length') === 0) {
            Me.msg.question('<b><span style="color:red;">Operación no Válida.</span></b> Asegúrese de asignar <b>Ejecutantes</b> y <b>Periodo de Chequeo</b> antes de archivar la Tarea Operativa.')
        } else {
            Ext.Ajax.request({
                url: '/tarea_operativa/to/generadas_archivar',
                params: { id: record.get('id') },
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
        }
    },
    // Eliminar
    confirm_remove: function (record) {
        Ext.MessageBox.confirm('Confirmación', 'Desea eliminar esta Tarea Operativa?<br><br>La Tarea Operativa será enviada a la Papelera.<br>Usted puede restaurarla desde el MENU principal.', confirm, this);
        function confirm (btn) {
            if (btn === 'yes') {
                this.remove_tarea(record);
            }
        }
    },
    remove_tarea: function (record) { var me=this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/generadas_remove',
            params: { id: record.get('id') },
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
    // Filter Tarea Operativa
    add_categoria_filter: function () {  var me = this, filter = [];
        this.store.clearFilter();
        if (this.combobox.value) {
            this.store.filter({
                property: 'categoria',
                value: me.combobox.value
            });
        }
    },
    add_fechas_filter: function () { var me=this;
        me.store.load({
            params: {
                fecha_start: Ext.util.Format.date(me.fecha_start.value, 'Y-m-d'),
                fecha_ended: Ext.util.Format.date(me.fecha_ended.value, 'Y-m-d')
            }
        });
    },
    clear_filter: function () {
        var datefield1 = Ext.getCmp('fecha-start-date'),
            datefield2 = Ext.getCmp('fecha-ended-date'),
            combobox = Ext.getCmp('to_categoria-combobox-id');
        combobox.setValue();
        datefield1.setValue();
        datefield2.setValue();
        this.store.clearFilter();
        this.store.load();
    },
    // Menus
    cell_context_menu: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this, menu, component;
        switch (cellIndex){
            case 1:
            case 2:
            case 3:
                component = 'etecsa.view.tareas_op.generadas_pendiente_menu';
                break;
            case 5:
                component = 'etecsa.view.tareas_op.prorroga.to_prorroga_menu';
                break;
            case 6:
                component = 'etecsa.view.tareas_op.periodo_chequeo.to_periodo_chequeo_menu';
                break;
            case 7:
                component = 'etecsa.view.tareas_op.ejecutante.to_ejecutante_menu';
                break;
            case 8:
                component = 'etecsa.view.tareas_op.adjunto.to_adjunto_menu';
                break;
            case 9:
                component = 'etecsa.view.tareas_op.resumen_subtarea.to_resumen_tarea_menu';
                break;
        }
        if (component) {
            menu = Ext.create(component, { me_record: record, me_grid: me.grid });
            menu.showAt(e.getXY());
            e.stopEvent();
        }
    },
    // Windows
    show_prorroga: function (record) { var me = this;
        Ext.create('etecsa.view.tareas_op.prorroga.to_prorroga_form', {
            tarea_id: record.get('id'),
            grid: me.grid
        })
    },
    show_periodo_chequeo: function (record) {
        var me = this,
            win_p_chequeo = Ext.create('etecsa.view.tareas_op.periodo_chequeo.to_periodo_chequeo_form', {
                store: me.grid.store,
                tarea_id: record.get('id')
            });
        if (record.get('periodo_chequeo') === '-') {
            win_p_chequeo.setHeight(464);
        } else {
            win_p_chequeo.setHeight(490);
        }
        win_p_chequeo.show();
    },
    show_ejecutantes: function (record) { var me = this;
        Ext.create('etecsa.view.tareas_op.ejecutante.to_ejecutante_form', {
            store: me.grid.store,
            tarea_id: record.get('id')
        });
    },
    show_adjuntos: function (record) { var me = this;
        var file_store = Ext.create('etecsa.store.to_upload');
            file_store.load({params:{tarea_operativa_pk:record.get('id')}});
        Ext.create('etecsa.view.tareas_op.adjunto.to_upload_form', {
            store: me.grid.store,
            tarea_id: record.get('id'),
            ejecutante_pk: null,
            file_store: file_store,
            button_action: 'tarea-adjunto-action'
        });
    }
});


