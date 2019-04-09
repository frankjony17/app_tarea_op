
Ext.define('etecsa.view.tareas_op.adjunto.to_adjunto_menu', {
    extend: 'Ext.menu.Menu',
    xtype: 'adjunto-menu',
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    stateEvents: ['adjunto_action'],

    initComponent: function (me_controller) { var me = this;
        me.items = ['-',{
            text: 'Adjuntar ficheros <b>(Max=7M)&nbsp;</b>',
            iconCls: 'x-fa fa-paperclip',
            listeners: {
                click: function () {
                    me.fireEvent('adjunto_action', me.me_record);
                }
            }
        },'-'];
        me.callParent(arguments);
    }

});