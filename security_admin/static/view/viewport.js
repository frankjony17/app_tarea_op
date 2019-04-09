
Ext.define('etecsa.view.viewport', {
    extend: 'Ext.container.Viewport',
    xtype : 'viewport-admin',
    layout: 'border',
    id: 'admin-viewport-id',
    initComponent: function() {
        var me = this;
        me.items = [{
            region: 'west',
            title: 'Tarea Op Admin',
            width: 225,
            split: true,
            collapsible: true,
            id: 'west-panel-id',
            layout: 'accordion',
            defaults: {
                bodyPadding: 10
            },
            border: true,
            items: [{
                title: '<div style="text-align: center;"><b>Seguridad</b></div>',
                items: Ext.create('etecsa.view.seguridad_tree'),
                iconCls: 'seguridad'
            },{
                title: '<div style="text-align: center;"><b>Nomencladores</b></div>',
                items: Ext.create('etecsa.view.nomenclador_tree'),
                iconCls: 'nomenclador'
            },{
                title: '<div style="text-align: center;"><b>Email</b></div>',
                iconCls: 'email'
            }]
        }, {
            region: 'center',
            xtype: 'panel',
            items: [{
                region: 'north',
                items: [{
                    xtype: 'toolbar',
                    style: { backgroundColor: '#5FA2DD' },
                    items:[{
                        xtype: 'tbfill'
                    },{
                        text: 'Enlaces',
                        menu: Ext.create('etecsa.view.enlaces_menu', { app_id: 'admin-app-id' }),
                        iconCls: 'enlase'
                    },{
                        text: 'Salir',
                        iconCls: 'logout',
                        id: 'admin-logout'
                    }]
                }]
            },{
                region: 'center',
                xtype: 'panel',
                bodyStyle: 'background-image:url(../static/../static/images/square.gif);',
                id: 'center-region-id'
            },{
                region: 'south',
                items: Ext.create('etecsa.view.status_bar_panel'),
                id: 'south-panel-id'
            }],
            id: 'center-panel-id'
        }];
        me.callParent(arguments);
    }
});