
Ext.define('etecsa.controller.to_generadas.prorrogas', {
    extend: 'Ext.app.Controller',
    control: {
        'to-prorroga-win': {
            afterrender: "after_render_window"
        },
        'to-prorroga-win [xtype=grid]': {
            rowclick: "load_data_to_form",
            remove_grid_action: "confirm_remove"
        },
        'to-prorroga-win [text=Salvar]': {
            click: "is_valid"
        },
        'to-prorroga-win [text=Editar]': {
            click: "validate_edit"
        }
    },
    after_render_window: function (window) {
        this.window = window;
        this.form = window.down('form');
        this.grid = window.down('grid');
        this.store = window.prorroga_store
    },
    // Salvar
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
                me.window.grid.store.reload();
                Me.show_toast('Operación realizada exitosamente.');
            },
            failure: function(form, action) {
                Me.msg.warning(action.response.responseText);
            }
        });
    },
    // Editar
    load_data_to_form: function (view, record) {
        this.form.loadRecord(record);
    },
    validate_edit: function () {
        if (this.form.getForm().isValid()) {
            var me = this, date = new Date(),value_date=Ext.util.Format.date(me.form.down('[name=fecha]').getValue(), 'Y-m-d').split('-'),create_date=new Date(value_date[0],parseInt(value_date[1]) - 1,parseInt(value_date[2]));
            if (parseInt(create_date.getFullYear()) === parseInt(date.getFullYear())) {
                if (parseInt(create_date.getMonth()) === parseInt(date.getMonth())) {
                    if (parseInt(create_date.getDate()) === parseInt(date.getDate())) {
                        me.edit_prorroga();
                    } else {
                        Me.msg.question('Solo se puede editar una Prorroga el día que fue creada..');
                    }
                } else {
                    Me.msg.question('Solo se puede editar una Prorroga el día que fue creada..');
                }
            } else {
                Me.msg.question('Solo se puede editar una Prorroga el día que fue creada..');
            }
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    edit_prorroga: function () { var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/prorroga/edit',
            params: {
                id: me.form.down('[name=id]').getValue(),
                prorroga: Ext.util.Format.date(me.form.down('[name=prorroga]').getValue(), 'Y-m-d'),
                motivo: me.form.down('[name=motivo]').getValue(),
                tarea_operativa_pk: me.form.down('[name=tarea_operativa_pk]').getValue()
            },
            success: function(response) {
                if (response.responseText) {
                    Me.msg.warning(response.responseText);
                } else {
                    Me.show_toast('Operación realizada exitosamente.');
                    me.form.getForm().reset();
                    me.store.reload();
                    me.window.grid.store.reload();
                }
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    // Eliminar
    confirm_remove: function (record) {
        Ext.MessageBox.confirm('Confirmación', 'Desea eliminar esta Prorroga?', confirm, this);
        function confirm (btn) {
            if (btn === 'yes') {
                this.remove(record);
            }
        }
    },
    remove: function (record) { var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/prorroga/remove',
            params: { id: record.get('id') },
            success: function(response) {
                if (response.responseText === '') {
                    Me.show_toast('Operación realizada exitosamente.');
                    me.store.reload();
                    me.window.grid.store.reload();
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


