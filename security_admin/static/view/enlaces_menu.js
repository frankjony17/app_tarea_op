
Ext.define('etecsa.view.enlaces_menu', {
    extend: 'Ext.menu.Menu',
    xtype: 'app-menu',
    
    titleAlign: 'center',
    defaults: {
        padding: 5
    },
    style: {
        overflow: 'visible'
    },
    width: 265,
    closeAction : 'destroy',

    initComponent: function () {
        var me = this; //menu = [];
        
        // Ext.Array.each(app, function(item) {
        //     if (item.id !== me.appId) {
        //         menu.push(item);
        //     }
        // });
        me.items = [{
            text: 'Admin'
        }];
        // me.listeners = {
        //     click: function (menu, item) {
        //         switch (item.id) {
        //             case 'tareas-operativas-app-responsable-id':
        //                 location.href = entorno+'/tareasoperativas/responsable';
        //                 break;
        //         }
        //     }
        // };
        me.callParent(arguments);
    }
});