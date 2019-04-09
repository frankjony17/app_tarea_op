
Ext.define('etecsa.view.tareas_op.ejecutante_accion.ejecutante_accion_panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'ejecutante-accion-panel',

    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {
        ui: 'light',
        xtype: 'panel',
        bodyPadding: 5
    },
    bodyStyle: 'background-image:url(../static/../static/images/square.gif);',
    scrollable: true,

    initComponent: function() {
        var me = this;
        
        me.periodo_chequeo_store = Ext.create('etecsa.store.to_periodo_chequeo');
        me.periodo_chequeo_store.load({ params: { id: me.record.get('id') }});

        me.items = [{
            layout: 'hbox',
            bodyStyle: 'background-image:url(../static/../static/images/square.gif);',
            defaults: {
                xtype: 'panel',
                ui: 'light',
                hidden: false,
                bodyPadding: 5
            },
            items: [{
                items: [{
                    xtype: 'panel',
                    html: '<b>' + me.record.get('numero') +': </b>'+ me.record.get('descripcion'),
                    width: '100%',
                    height: 100,
                    border: true,
                    scrollable: true,
                    bodyPadding: 5
                }],
                flex: 4,
                height: 110,
                margin: '0 5 0 0'
            },{
                layout: 'anchor',
                items: [{
                    xtype: 'grid',
                    width: '100%',
                    border: true,
                    store: me.periodo_chequeo_store,
                    columns: [{
                        text: '<b>Periodo de Chequeo:</b>',
                        flex: 1,
                        columns: [
                            {text: 'id', dataIndex: 'id', hidden: true},
                            {text: 'Periodo (CH)',dataIndex: 'periodo',sortable: false,menuDisabled:true,flex:1,renderer: function (value){return '<span style="color: green"><b>' + value + '</b></span>'}},
                            {text: 'Días (Sem)', dataIndex: 'dia_semana', sortable: false, menuDisabled: true, flex: 2},
                            {text: 'Fechas (CH)',dataIndex: 'fecha_especifica',sortable: false,menuDisabled: true,flex: 2}
                        ]}
                    ]
                }],
                flex: 5,
                height: 110,
                margin: '0 5 0 0'
            },{
                items: [{
                    xtype: 'panel',
                    html: '<div style="text-align:center;color:green"/><h1>' + me.record.get('adjunto_length') +'</h1>',
                    width: '100%',
                    height: 60,
                    border: true,
                    bodyPadding: 2,
                    margin: '0 0 5 0'
                },{
                    xtype: 'button',
                    text: 'Ver Adjuntos',
                    iconCls: 'x-fa fa-paperclip',
                    action: 'panel-adjunto-show',
                    width: '100%'
                }],
                flex: 1,
                height: 110,
                margin: '0 5 0 0'
            }]
        },{
            layout: 'anchor',
            bodyStyle: 'background-image:url(../static/../static/images/square.gif);',
            defaults: {
                xtype: 'panel',
                ui: 'light',
                hidden: false,
                bodyPadding: 5
            },
            items: [{
                margin: '0 0 5 0',
                items: {
                    xtype: 'grid',
                    name: 'grid-ejecutante-accion',
                    viewConfig:{
                        markDirty:false
                    },
                    width: '100%',
                    border: true,
                    store: me.ejecutante_store,
                    record: me.record,
                    columnLines: true,
                    columns: [
                        {text: 'id', dataIndex: 'id', hidden: true},
                        {
                            text: 'Fecha',dataIndex:'fecha',
                            renderer: function (value, metaData) {
                                metaData.tdStyle = 'background-color:rgba(236, 250, 225, 0.44);border:1px solid rgba(203, 218, 193, 0.83);';
                                return '<b>'+ value +'</b>'
                            },
                            sortable:false,menuDisabled:true,flex:1
                        },{
                            text: 'Observaciones',dataIndex:'observacion',
                            editor: {
                                maxLength: 100
                            },
                            sortable:false,menuDisabled:true,flex:6
                        },{
                            text: 'Entrada (U)',dataIndex:'ultima_entrada',
                            renderer: function (value, metaData) {
                                metaData.tdStyle = 'background-color:rgba(236, 250, 225, 0.44);border:1px solid rgba(203, 218, 193, 0.83);';
                                return '<b>'+ value +'</b>'
                            },
                            sortable:false,menuDisabled:true,flex:1,align:'center'
                        },{
                            header: 'Adjunto',
                            columns: [{
                                text: '<span style="color: red">*</span>',
                                dataIndex:'requiere_adjunto',
                                xtype:'booleancolumn',
                                trueText:'<span style="color:red"><b>Si</b></span>',
                                falseText:'<span style="color:green"><b>No</b></span>',
                                sortable:false,menuDisabled:true,width:45,align:'center'
                            },{
                                text: '<img src="../static/../static/images/paperclip.png" />',
                                sortable:false,menuDisabled:true,width:45,
                                dataIndex: 'adjunto',
                                align: 'center',
                                renderer: function (value) {
                                    return '<span style="color:#865F27;background-color:rgba(236,250,225,0.44);border:1px solid rgba(203,218,193,0.83);"><b>'+ value +'</b></span>'
                                }
                            }]
                        },
                        {xtype:'checkcolumn',text:'(E)',dataIndex:'estado',sortable:false,menuDisabled:true,width:40,name:'checkcolumn-ejecutante-panel'}
                    ],
                    plugins: {
                        cellediting: {
                            clicksToEdit: 1
                        }
                    }
                }
            },{
                items: {
                    xtype: 'grid',
                    name: 'grid-accion-ejecutante',
                    ejecutante_id: me.record.get('ejecutante_id'),
                    width: '100%',
                    border: true,
                    store: me.accion_store,
                    columnLines: true,
                    autoLoad: true,
                    selModel: {
                        type: 'cellmodel'
                    },
                    tbar: [{
                        text: 'Adicionar Acción',
                        iconCls: 'x-fa fa-plus',
                        action: 'on_add_accion'
                    }],
                    plugins: {
                        cellediting: {
                            clicksToEdit: 2
                        }
                    },
                    columns: [
                        {text: 'id', dataIndex: 'id', hidden: true},
                        {text: 'eid', dataIndex: 'ejecutante_id', hidden: true},
                        {text: 'Fecha',dataIndex:'fecha',flex:1},
                        {
                            text: 'Descripción',
                            dataIndex:'descripcion',
                            sortable:false,menuDisabled:true,
                            editor: {
                                allowBlank: false,
                                maxLength: 120
                            },
                            flex:6
                        },{
                            text: 'Pronóstico',
                            dataIndex:'pronostico',
                            sortable:false,menuDisabled:true,
                            editor: {
                                xtype: 'datefield',
                                minValue: new Date(),
                                format: 'Y-m-d',
                                editable: false,
                                emptyText: "PRONÓSTICO"
                            },
                            flex:1
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
                    ]
                }
            }]
        }];
        me.callParent(arguments);
    }
});