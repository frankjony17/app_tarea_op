
Ext.define('etecsa.view.tareas_op.resumen_chequeo.resumen_chequeo_panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'resumen-chequeo-panel',

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
        me.ejecutante = Ext.create('etecsa.store.to_ejecutante');
        me.ejecutante.load({ params: { id: me.record.get('id') }});
        me.periodo_chequeo_store = Ext.create('etecsa.store.to_periodo_chequeo');
        me.periodo_chequeo_store.load({ params: { id: me.record.get('id') }});
        me.ejecutante.clearFilter();
        me.ejecutante.filter({
            property: 'estado',
            value: false
        });
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
                flex: 2,
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
                flex: 2,
                height: 110,
                margin: '0 5 0 0'
            },{
                items: Ext.create({
                    xtype: 'polar',
                    reference: 'chart',
                    theme: 'default-gradients',
                    interactions: ['rotate'],
                    store: {
                        fields: ['estado', 'total'],
                        data: [{
                           estado: 'Cumplen',
                           total: me.record.get('e_c')
                        },{
                           estado: 'Incumplen',
                           total: me.record.get('e_i')
                        }]
                    },
                    series: {
                        type: 'pie',
                        highlight: false,
                        angleField: 'total',
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(record.get('estado') + ': ' + record.get('total'));
                            }
                        },
                        donut: 30,
                        showInLegend: true,
                        label: {
                            field: 'estado',
                            width: 3,
                            height: 5,
                            contrast: true,
                            font: '18px Arial'
                        }
                    },
                    width: '100%',
                    height: 100
                }),
                flex: 1,
                height: 110
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
                    name: 'ejecutante-grid-panel',
                    width: '100%',
                    border: true,
                    store: me.ejecutante,
                    columnLines: true,
                    columns: [
                        {text: 'id', dataIndex: 'id', hidden: true},
                        {text: 'Ejecutante',dataIndex: 'ejecutante',sortable: false,menuDisabled:true,flex:2},
                        {text: 'Observaciones', dataIndex: 'observacion', sortable: false, menuDisabled: true, flex: 5},
                        {text: 'Entrada (U)', dataIndex: 'ultima_entrada',sortable: false,menuDisabled: true,flex: 1},
                        {xtype:'checkcolumn',text:'(E)',dataIndex:'estado',sortable:false,menuDisabled:true,width:40,name:'checkcolumn-ejecutante-tarea'}
                    ],
                    plugins: [{
                        ptype: 'rowwidget',
                        widget: {
                            xtype: 'grid',
                            bind: {
                                store: '{record.acciones}',
                                title: 'Acciones de: {record.ejecutante}'
                            },
                            columns: [
                                { text: 'id', dataIndex: 'id', hidden: true },
                                { text: 'Fecha',dataIndex: 'fecha', flex: 1 },
                                { text: 'Descripción',dataIndex: 'descripcion', flex: 5 },
                                { text: 'Pronóstico',dataIndex: 'pronostico', flex: 1 }
                            ]
                        }
                    }],
                    tbar: [{
                        xtype: 'displayfield',
                        value: '<h4>Ejecutantes</h4>'
                    },'->',{
                        xtype: 'combobox',
                        store: [{estado: false, name: 'Pendiente'}, {estado: true, name: 'Cumplen'}],
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'estado',
                        value: false,
                        editable: false,
                        listeners: {
                            select: function (combo) {
                                me.ejecutante.clearFilter();
                                me.ejecutante.filter({
                                    property: 'estado',
                                    value: combo.value
                                });
                            }
                        },
                        width: 250
                    }]
                }
            }]
        }];
        me.callParent(arguments);
    }
});