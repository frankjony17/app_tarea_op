
Ext.define('etecsa.controller.to_generadas.resumen_chequeo', {
    extend: 'Ext.app.Controller',
    control: {
        'resumen-chequeo-panel': {
            resize: "resize"
        },
        'resumen-chequeo-panel [name=checkcolumn-ejecutante-tarea]': {
            checkchange: "activar_ejecutante"
        },
        'resumen-chequeo-panel [name=ejecutante-grid-panel]': {
            afterrender: "afterrender_ejecutante_grid"
        }
    },
    resize: function (panel) {
        var center = Ext.getCmp('center-tabpanel-region-id'),
            grid = panel.down('[name=ejecutante-grid-panel]');
        grid.setHeight(center.getHeight() - 195);
        panel.setHeight(center.getHeight() - 50);
    },
    afterrender_ejecutante_grid: function (grid) {
        this.ejecutante_store = grid.store;
    },
    //
    activar_ejecutante: function (checkColumn, rowIndex, checked, record) {
        var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/ejecutante_accion/ejecutante_edit',
            params: {
                id: record.get('id'),
                estado: checked
            },
            success: function(){
                me.ejecutante_store.reload();
            },
            failure: function(response){
                Me.msg.warning(response.responseText);
            }
        });
    }
});


