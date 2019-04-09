
Ext.define('etecsa.controller.to_generadas.periodo_chequeo', {
    extend: 'Ext.app.Controller',
    control: {
        'to-periodo-chequeo-win': {
            afterrender: "after_render_window"
        },
        'to-periodo-chequeo-win [xtype=grid]': {
            rowclick: "load_data_to_form",
            remove_grid_action: "confirm_remove"
        },
        'to-periodo-chequeo-win [text=Salvar]': {
            click: "is_valid"
        }
    },
    after_render_window: function (window) {
        this.window = window;
        this.grid_periodo_chequeo = window.down('[name=grid-periodo-chequeo]');
    },
    load_data_to_form: function (view, record) {
        var periodo_field = this.window.down('[name=periodo]').down('[xtype=combobox]'),
            dia_sem_field = this.window.down('[name=dias_de_la_semana]').down('[xtype=tagfield]'),
            fecha_e_store = this.window.fecha_store;

        periodo_field.setValue(record.get('periodo'));
        if (record.get('dia_semana')) {
           dia_sem_field.setValue(record.get('dia_semana').split('|'));
        }
        if (record.get('fecha_especifica')) {
            Ext.Array.each(record.get('fecha_especifica').split('|'), function (fecha) {
                fecha_e_store.add({'id':fecha, 'fecha': fecha});
            });
        }
    },
    // Salvar
    is_valid: function () {
        var periodo_field = this.window.down('[name=periodo]').down('[xtype=combobox]'),
            dia_sem_field = this.window.down('[name=dias_de_la_semana]').down('[xtype=tagfield]'),
            diasemana_str = "",
            fechaespe_str = "", me = this;

        Ext.Array.each(dia_sem_field.getValue(), function (dia) {
            diasemana_str += dia + "|";
        });
        this.window.fecha_store.each(function (rec) {
            fechaespe_str += rec.get('fecha') + "|";
        });
        switch (periodo_field.getValue()) {
            case 'Di':
                me.save_periodo_chequeo({periodo: 'Di',tarea_operativa_pk: me.window.tarea_id});
                break;
            case 'Se':
            case 'Qu':
            case 'Me':
            case 'Tr':
            case 'An':
                if (diasemana_str !== "") {
                    me.save_periodo_chequeo({periodo: periodo_field.getValue(),dia_semana: diasemana_str,tarea_operativa_pk: me.window.tarea_id});
                } else {
                    Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, seleccione los Días de la Semana.')
                }
                break;
            case 'FF':
                me.save_periodo_chequeo({periodo: 'FF', tarea_operativa_pk: me.window.tarea_id});
                break;
            case 'FE':
                if (fechaespe_str !== "") {
                    me.save_periodo_chequeo({periodo: 'FE',fecha_especifica: fechaespe_str,tarea_operativa_pk: me.window.tarea_id});
                } else {
                    Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, seleccione las Fechas Especificas.')
                }
                break;
        }
    },
    save_periodo_chequeo: function (parameters) { var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/periodo_chequeo/add',
            params: parameters,
            success: function(response) {
                if (response.responseText === '') {
                    Me.show_toast('Operación realizada exitosamente.');
                    me.window.store.reload();
                    me.window.setHeight(125);
                    me.grid_periodo_chequeo.store.reload();
                } else {
                    Me.msg.warning(response.responseText);
                }
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    // Eliminar
    confirm_remove: function (record) { var me = this;
        Ext.MessageBox.confirm('Confirmación', 'Desea eliminar el Periodo de Chequeo?', confirm, this);
        function confirm (btn) {
            if (btn === 'yes') {
                if (this.grid_periodo_chequeo.store.getCount() > 0) {
                    this.window.setHeight(464);
                }
                this.remove(record);
            }
        }
    },
    remove: function (record) { var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/periodo_chequeo/remove',
            params: { id: record.get('id') },
            success: function(response) {
                if (response.responseText === '') {
                    Me.show_toast('Operación realizada exitosamente.');
                    me.window.store.reload();
                    me.grid_periodo_chequeo.store.reload();
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


