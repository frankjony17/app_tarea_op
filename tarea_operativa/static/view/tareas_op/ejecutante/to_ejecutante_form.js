
Ext.define('etecsa.view.tareas_op.ejecutante.to_ejecutante_form', {
    extend: 'Ext.window.Window',
    xtype: 'to-ejecutante-window',

    title: 'Ejecutantes',
    iconCls: 'x-fa fa-user',
    layout: 'fit',
    width: 770,
    height: 420,
    resizable: false,
    closable: true,
    autoShow: true,
    modal: true,
    y: 50,

    initComponent: function () { var me=this;
        me.ejecutante_store = Ext.create('etecsa.store.to_ejecutante');
        me.ejecutante_store.load({params:{id:me.tarea_id}});
        me.user_ni_ac_store = Ext.create('etecsa.store.to_user_nivel_acceso');
        me.user_ni_ac_store.load({params:{tarea_operativa_pk:me.tarea_id}});
        me.items = [{
            xtype: 'grid',
            border: true,
            store: me.ejecutante_store,
            stateEvents: 'remove_grid_action',
            columns: [
                {text: 'id', dataIndex: 'id', hidden: true},
                {text: 'pk', dataIndex: 'tarea_operativa_pk', hidden: true},
                {text: 'Creado',dataIndex: 'fecha',sortable: false,menuDisabled:true,flex:1,renderer: function (value){return '<span style="color: green"><b>' + value + '</b></span>'}},
                {text: 'Ejecutante', dataIndex: 'ejecutante', sortable: false, menuDisabled: true, flex: 3},
                {
                    xtype: 'checkcolumn',
                    text: '<img src="../static/../static/images/paperclip.png" />',
                    dataIndex: 'requiere_adjunto',
                    width: 40,
                    id: 'checkcolumn-requiere-adjunto'
                },{
                    xtype: 'actioncolumn', width: 25, sortable: false, menuDisabled: true,
                    items: [{
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Elimanar registro',
                        handler: function (view, rowIndex, colIndex, item, e, record) {
                            view.grid.fireEvent('remove_grid_action', record);
                        }
                    }]
                }
            ],
            tbar: [{
                xtype: 'combobox',
                emptyText: 'UNIDAD ORGANIZATIVA',
                store: Ext.create('etecsa.store.unidad_organizativa'),
                queryMode: 'local',
                displayField: 'acronimo',
                editable: false,
                listeners: {
                    select: function(combo){
                        me.user_ni_ac_store.clearFilter();
                        if (combo.value) {
                            me.user_ni_ac_store.filter({
                                property: 'unidad_organizativa',
                                value: combo.value,
                                anyMatch: true
                            });
                        }
                        me.down('[emptyText=TRABAJADOR]').getValue();
                    }
                },
                width: 200
            },' ',{
                xtype: 'combobox',
                emptyText: 'TRABAJADOR',
                store: me.user_ni_ac_store,
                queryMode: 'local',
                displayField: 'username',
                valueField: 'id',
                editable: false,
                listConfig: {
                    itemTpl: [
                        '<div data-qtip="{username}">{username} <b>({departamento})</b></div>'
                    ]
                },
                flex: 1
            }]
        }];
        me.callParent(arguments);
    }
});