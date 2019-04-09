
Ext.define('etecsa.view.tareas_op.periodo_chequeo.to_periodo_chequeo_menu', {
    extend: 'Ext.menu.Menu',
    xtype: 'periodo-chequeo-menu',
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    stateEvents: ['periodo_action', 'check_tarea_action'],

    initComponent: function (me_controller) { var me = this;
        me.items = ['-',{
            text: 'Ver / Editar <b>(Periodo-Chequeo)&nbsp;</b>',
            iconCls: 'x-fa fa-tasks',
            listeners: {
                click: function () {
                    me.fireEvent('periodo_action', me.me_record);
                }
            }
        },'-'];
        me.callParent(arguments);
    }

});