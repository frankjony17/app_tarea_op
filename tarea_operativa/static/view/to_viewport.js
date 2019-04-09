
Ext.define('etecsa.view.to_viewport', {
    extend: 'Ext.container.Viewport',
    xtype : 'viewport-tarea-operativa',
    layout: {
        type: 'border',
        padding: 2
    },
    initComponent: function() {
        var me = this;
        me.items = [{
            region: 'north',
            xtype: 'panel',
            bodyStyle: 'background-color:#5FA2DD;',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items:[{
                xtype: 'buttongroup',
                frame:false,
                items: [{
                    text: 'Pendientes (TO)',
                    menu: Ext.create('etecsa.view.to_menu_pendientes'),
                    tooltip: 'Listado de Tareas Operativas pendientes.',
                    iconCls: 'tareas-op-p-css'
                },{
                    menu: Ext.create('etecsa.view.to_menu_opciones'),
                    tooltip: 'Opciones posibles sobre las Tareas Operativas.',
                    iconCls: 'options-menu-css'
                }]
            },{
                xtype: 'tbfill'
            },{
                xtype: 'buttongroup',
                frame:false,
                items: [{
                    text: 'Enlaces',
                    menu: Ext.create('etecsa.view.enlaces_menu', { app_id: 'tarea-app-id' }),
                    iconCls: 'enlase'
                },{
                    text: 'Salir',
                    iconCls: 'logout',
                    id: 'admin-logout-to'
                }]
            }]
        },{
            region: 'center',
            xtype: 'tabpanel',
            title: 'Tab Panel',
            border: true,
            iconAlign: 'right',
            titleAlign: 'right',
            headerPosition: 'bottom',
            tabBarHeaderPosition: 0,
            defaults: {
                scrollable: false,
                closable: true,
                border: true
            },
            listeners: {
                render: {
                    fn: function(tabpanel) {
                        Ext.TaskManager.start({
                            run: function(){
                                tabpanel.setTitle('<b>'+Ext.Date.format(new Date(), 'Y/m/d H:i:s')+'</b>');
                            },
                            interval: 1000
                        });
                    },
                    delay: 100
                }
            },
            bodyStyle: 'background-image:url(../static/../static/images/square.gif);',
            id: 'center-tabpanel-region-id'
        }];
        me.callParent(arguments);
    }
});