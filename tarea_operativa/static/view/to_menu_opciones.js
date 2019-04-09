
Ext.define('etecsa.view.to_menu_opciones', {
    extend: 'Ext.menu.Menu',
    xtype: 'tarea-op-opciones-menu',
    width: 280,
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    stateEvents: ['categoria_item_menu'],

    initComponent: function () { var me = this;
        me.items = [{
            text: 'Categorías <b>(Papelera, Tarea Operativa)</b>',
            iconCls: 'x-fa fa-map-signs',
            listeners: {
                click: function () {
                    me.fireEvent('categoria_item_menu');
                }
            }
        }];
        me.callParent(arguments);
    }

});