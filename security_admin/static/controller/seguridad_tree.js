
Ext.define('etecsa.controller.seguridad_tree', {
    extend: 'Ext.app.Controller',
    control: {
        'tree-seguridad': {
            itemclick: "item_click"
        },
        'permission-grid': {
            resize: "resize"
        }
    },
    resize: function (grid) {
        var center = Ext.getCmp('center-region-id');
        grid.setHeight(center.getHeight());
    },
    item_click: function (sender, info, eOpts) {
        var center_area = Ext.getCmp('center-region-id');
        switch (info.node.data.index) {
            case 0:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.permission.grid'));
                break;
            case 1:
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.permission.grid'));
                break;
            default: // 3
                center_area.removeAll();
                center_area.add(Ext.create('etecsa.view.user.grid'));
                break;
        }
    }
    // // Update detalle de barra de estado.
    // updateStatusBar: function (texto)
    // {
    //     var status_bar = Ext.getCmp('status-bar-detalles');
    //
    //     switch (texto) {
    //         case '---':
    //             status_bar.update('<b><span style="color:#000;"><b>Propósito > Léeme?</b></span></b>');
    //             break;
    //         default:
    //             var arreglo = texto.split('>'); arreglo = arreglo[1].split('<');
    //             status_bar.update('<b><span style="color:#000;"><b>Gestionar > '+ arreglo[0] +'</b></span></b>');
    //             break;
    //     }
    // },
});