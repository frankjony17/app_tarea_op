
Ext.define('etecsa.view.tareas_op.prorroga.to_prorroga_menu', {
    extend: 'Ext.menu.Menu',
    xtype: 'prorroga-menu',
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    stateEvents: ['prorroga_action'],

    initComponent: function (me_controller) { var me = this;
        me.items = ['-',{
            text: 'Prorroga <b>(Ver, Adicionar, Editar)&nbsp;</b>',
            iconCls: 'x-fa fa-calendar',
            listeners: {
                click: function () {
                    me.fireEvent('prorroga_action', me.me_record);
                }
            }
        },'-'];
        me.callParent(arguments);
    }

});