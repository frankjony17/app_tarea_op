
Ext.define('etecsa.view.tareas_op.ejecutante.to_ejecutante_menu', {
    extend: 'Ext.menu.Menu',
    xtype: 'ejecutante-menu',
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    stateEvents: ['ejecutante_action'],

    initComponent: function (me_controller) { var me = this;
        me.items = ['-',{
            text: 'Ejecutantes <b>(Ver, Adicionar, Editar)&nbsp;&nbsp;</b>',
            iconCls: 'x-fa fa-user',
            listeners: {
                click: function () {
                    me.fireEvent('ejecutante_action', me.me_record);
                }
            }
        },'-'];
        me.callParent(arguments);
    }

});