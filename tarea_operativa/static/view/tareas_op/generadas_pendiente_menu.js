
Ext.define('etecsa.view.tareas_op.generadas_pendiente_menu', {
    extend: 'Ext.menu.Menu',
    xtype: 'tarea-operativa-menu',
    plain: true,
    margin: '10 10 10 10',
    closeAction: 'destroy',
    showSeparator: true,
    width: 327,

    initComponent: function (me_controller) { var me = this;
        me.items = ['-',{
            text: 'Publicar Tarea Operativa <b>(Hacer Visible)</b>',
            iconCls: 'x-fa fa-send',
            listeners: {
                click: function () {
                    me.fireEvent('publicar_tarea_action', me.me_record);
                }
            }
        },'-',{
            text: 'Archivar Tarea Operativa <b>(TO=Cerrada)</b>',
            iconCls: 'x-fa fa-archive',
            listeners: {
                click: function () {
                    me.fireEvent('archivar_tarea_action', me.me_record);
                }
            }
        },'-',{
            text: 'Editar Tarea Operativa <b>(Fechas y Descripción)</b>.',
            iconCls: 'x-fa fa-edit',
            listeners: {
                click: function () {
                    me.fireEvent('editar_tarea_action', me.me_record);
                }
            }
        },'-',{
            text: 'Eliminar Tarea Operativa <b>(Se envia a Papelera)</b>.',
            iconCls: 'x-fa fa-trash',
            listeners: {
                click: function () {
                    me.fireEvent('eliminar_tarea_action', me.me_record);
                }
            }
        },'-',{
            text: 'Chequeo Tarea Operativa <b>(Resumen)</b>.',
            iconCls: 'x-fa fa-check-square-o',
            listeners: {
                click: function () {
                    me.fireEvent('chequear_resumen_tarea_action', me.me_record);
                }
            }
        }];
        me.callParent(arguments);
    }

});