
Ext.define('etecsa.view.to_menu_pendientes', {
    extend: 'Ext.menu.Menu',
    xtype: 'tarea-op-pendientes-menu',
    width: 220,
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    stateEvents: ['me_assigned_task','me_generates_task'],

    initComponent: function () { var me = this;
        me.items = [{
            text: 'Asignadas <b>(Tareas Op)</b>',
            iconCls: 'x-fa fa-download',
            listeners: {
                click: function () {
                    me.fireEvent('me_assigned_task');
                }
            }
        },'-',{
            text: 'Generadas <b>(Tareas Op)</b>',
            iconCls: 'x-fa fa-upload',
            listeners: {
                click: function () {
                    me.fireEvent('me_generates_task');
                }
            }
        }];
        me.callParent(arguments);
    }
});