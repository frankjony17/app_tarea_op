
Ext.define('etecsa.controller.to_asignadas.asignadas', {
    extend: 'Ext.app.Controller',
    control: {
        'asignadas-pendiente-grid': {
            destroy: 'close_progressbarpager',
            resize: "resize",
            afterrender: "after_render_grid"
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
        this.fecha_start = grid.down('[id=fecha-start-asignadas-date]');
        this.fecha_ended = grid.down('[id=fecha-ended-asignadas-date]');
        this.position(grid);
    },
    close_progressbarpager: function (grid) {
        grid.progressbarpager.close();
    }
});


