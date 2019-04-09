
Ext.define('etecsa.controller.nomenclador.trabajador', {
    extend: 'Ext.app.Controller',
    control: {
        'trabajador-grid': {
            resize: "resize",
            afterrender: "after_render_grid"
        },
        'trabajador-grid [text=Adicionar]': {
            click: "show_form"
        },
        'trabajador-grid [text=Editar]': {
            click: "is_row_selected_valid"
        },
        'trabajador-grid [text=Eliminar]': {
            click: "confirm_remove"
        },
        'trabajador-win': {
            afterrender: "after_render_window"
        },
        'trabajador-win [text=Salvar]': {
            click: "is_valid"
        },
        'trabajador-win [text=Editar]': {
            click: "submit_form"
        }
    },
    resize: function (grid) {
        var center = Ext.getCmp('center-region-id');
        grid.setHeight(center.getHeight());
    },
    after_render_grid: function (grid) {
        this.grid = grid;
        this.store = grid.getStore();
    },
    after_render_window: function (window) {
        this.window = window;
        this.form = window.down('form');
    },
    show_form: function (button) { var me = this;
        if (button.text == "Adicionar") {
            Ext.create('etecsa.view.trabajador.form', {
                url: '/nomenclador/trabajador/add',
                store: me.store,
                title: 'Adicionar Trabajador',
                button_text: 'Salvar'
            }).show();
        } else {
            var record = me.grid.getSelection()[0],
                window = Ext.create('etecsa.view.trabajador.form', {
                    url: '/nomenclador/trabajador/edit',
                    store: me.store,
                    title: 'Editar Trabajador',
                    button_text: 'Editar',
                    trabajador_id: record.get('id')
                }),
                form = window.down('form');
            form.loadRecord(record);
            window.show();
        }
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
    is_row_selected_valid: function (button) {
        if (this.grid.selModel.getCount() == 1) {
            this.show_form(button)
        } else {
             Me.msg.question('Seleccione el registro que desea editar. <br><b>SOLO UNO</b>');
        }
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
            url: '/nomenclador/trabajador/remove',
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
    }
});


