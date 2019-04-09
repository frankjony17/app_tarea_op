
Ext.define('etecsa.controller.to_generadas.ejecutante', {
    extend: 'Ext.app.Controller',
    control: {
        'to-ejecutante-window': {
            afterrender: "after_render_window"
        },
        'to-ejecutante-window [xtype=grid]': {
            remove_grid_action: "confirm_remove"
        },
        'to-ejecutante-window [emptyText=TRABAJADOR]': {
            select: "save_ejecutante"
        },
        '#checkcolumn-requiere-adjunto': {
            checkchange: "check_requiere_adjunto"
        }
    },
    after_render_window: function (window) {
        this.window = window;
    },
    save_ejecutante: function (combo, record) { var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/ejecutante/add',
            params: {
                user_pk: record.get('id'),
                tarea_operativa_pk: me.window.tarea_id
            },
            success: function(response) {
                if (response.responseText == '') {
                    Me.show_toast('Operación realizada exitosamente.');
                    me.window.ejecutante_store.reload();
                    me.window.user_ni_ac_store.reload();
                    me.window.store.reload();
                    combo.setValue();
                } else {
                    combo.setValue();
                    Me.msg.warning(response.responseText);
                }
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    },
    // Adjunto es requerido
    check_requiere_adjunto: function (checkColumn, rowIndex, checked, record) {
        var me = this, window = checkColumn.up('window');
        Ext.Ajax.request({
            url: '/tarea_operativa/to/ejecutante/requiere_adjunto',
            params: {
                id: record.get('id'),
                requiere_adjunto: checked
            },
            success: function(){
                me.window.ejecutante_store.reload();
            },
            failure: function(response){
                Me.msg.warning(response.responseText);
            }
        });
    },
    // Eliminar
    confirm_remove: function (record) {
        Ext.MessageBox.confirm('Confirmación', 'Desea eliminar al Ejecutante?', confirm, this);
        function confirm (btn) {
            if (btn === 'yes') {
                this.remove(record);
            }
        }
    },
    remove: function (record) { var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/ejecutante/remove',
            params: { id: record.get('id') },
            success: function(response) {
                if (response.responseText === '') {
                    Me.show_toast('Operación realizada exitosamente.');
                    me.window.ejecutante_store.reload();
                    me.window.user_ni_ac_store.reload();
                    me.window.store.reload();
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


