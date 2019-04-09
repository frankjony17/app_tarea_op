
Ext.define('etecsa.view.tareas_op.generadas_pendiente_grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'generadas-pendiente-grid',

    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],
    width: '100%',
    columnLines: true,
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '{name} ({rows.length})'
    }],
    initComponent: function() { var me = this;
        me.viewConfig = {
            getRowClass: function(record) {
                if(record.get('publica') == false) {
                    return 'grid-row-publica-false-css';
                }
            }
        };
        me.store = Ext.create('etecsa.store.to_generadas_pendiente');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Número',
            dataIndex: 'numero',
            sortable: false,
            menuDisabled: true,
            width: 100,
            exportStyle: {
                alignment: {
                    horizontal: 'Right'
                },
                format: 'Short Date'
            }
        },{
            text: 'Descripción',
            dataIndex: 'descripcion',
            flex: 1
        },{
            text: 'Fecha',
            columns: [{
                text: 'Inicio',
                dataIndex: 'fecha_start',
                sortable: false,
                menuDisabled: true,
                width: 90
            },{
                text: 'Final',
                dataIndex: 'fecha_ended',
                sortable: false,
                menuDisabled: true,
                renderer: function (value, metaData) {
                    var v=value.split('-'),to_day = new Date(),date_task=new Date(v[0],parseInt(v[1]) - 1,parseInt(v[2]));
                    if (to_day >= date_task) {
                        metaData.tdStyle = 'background-color:rgba(255,67,69,0.2);border:1px solid rgba(255, 67, 69, 0.44);';
                    } else {
                        metaData.tdStyle = 'background-color:rgba(236, 250, 225, 0.44);border:1px solid rgba(203, 218, 193, 0.83);';
                    }
                    return '<b>'+ value +'</b>'
                },
                width: 90
            }]
        },{
            text: '<img src="../static/../static/images/calendar.png" />',
            dataIndex: 'prorroga_length',
            tooltip: 'Prorroga de Tarea Operativa',
            align: 'center',
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData) {
                if (parseInt(value) > 0) {
                    metaData.tdStyle = 'background-color:rgba(255,67,69,0.2);border:1px solid rgba(255, 67, 69, 0.44);';
                } else {
                    metaData.tdStyle = 'background-color:rgba(236, 250, 225, 0.44);border:1px solid rgba(203, 218, 193, 0.83);';
                }
                return '<b>'+ value +'</b>'
            },
            width: 46
        },{
            text: '<img src="../static/../static/images/tasklist.png" />',
            dataIndex: 'periodo_chequeo',
            tooltip: 'Chequeo de Tarea Operativa (Periodo)',
            align: 'center',
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData) {
                if (value == '-') {
                    metaData.tdStyle = 'background-color:rgba(255,67,69,0.2);border:1px solid rgba(255, 67, 69, 0.44);';
                }
                return '<span style="color: green"><b>'+ value +'</b></span>'
            },
            width: 44
        },{
            text: '<img src="../static/../static/images/user.png" />',
            dataIndex: 'ejecutante_length',
            tooltip: 'Cantidad de Ejecutantes (Responsables)',
            align: 'center',
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData) {
                if (parseInt(value) == 0) {
                    metaData.tdStyle = 'background-color:rgba(255,67,69,0.2);border:1px solid rgba(255, 67, 69, 0.44);';
                } else {
                    metaData.tdStyle = 'background-color:rgba(236, 250, 225, 0.44);border:1px solid rgba(203, 218, 193, 0.83);';
                }
                return '<b>'+ value +'</b>'
            },
            width: 44
        },{
            text: '<img src="../static/../static/images/paperclip.png" />',
            dataIndex: 'adjunto_length',
            tooltip: 'Cantidad de Ficheros Adjuntos',
            align: 'center',
            sortable: false,
            menuDisabled: true,
            renderer: function (value) {
                return '<span style="color:#865F27"><b>'+ value +'</b></span>'
            },
            width: 44
        },{
            text: '<img src="../static/../static/images/chart.png" />',
            xtype: 'widgetcolumn',
            widget: {
                bind: '{record.progress}',
                xtype: 'progressbarwidget',
                textTpl: [
                    '{percent:number("0")} %'
                ]
            },
            align: 'center',
            width: 72,
            sortable: false,
            menuDisabled: true
        },{
            dataIndex: 'publica',
            hidden: true
        }];
        me.tbar = Ext.create('Ext.toolbar.Toolbar',{
            height: 50,
            items: [{
                text: 'Crear (TO)',
                iconCls: 'x-fa fa-plus-square',
                tooltip: 'Crear Tarea Operativa <br> <b>Menu:</b> Opciones Tareas Operativas.'
            },'-',{
                iconCls: 'x-fa fa-send',
                tooltip: 'Publicar Tarea Operativa <br><b>Se hace visible Tareas Operativas.'
            },{
                iconCls: 'x-fa fa-archive',
                tooltip: 'Archivar Tarea Operativa <br> <b>Se culmina el seguimiento TO = Cerrada, OK</b>.'
            },{
                iconCls: 'x-fa fa-edit',
                tooltip: 'Editar Tarea Operativa <br> <b>Fechas y Descripción</b>.'
            },{
                iconCls: 'x-fa fa-trash',
                tooltip: 'Eliminar Tarea Operativa <br> <b>No se ELIMINA cambia de ESTADO, TO = Papelera</b>.'
            },'-','->','-',{
                xtype: 'combobox',
                store: Ext.create('etecsa.store.to_categoria'),
                queryMode: 'local',
                displayField: 'nombre',
                width: 240,
                emptyText: 'FILTRAR=(CATEGORIA)',
                editable: false, id: 'to_categoria-combobox-id'
            },{
                xtype: 'datefield',
                emptyText: 'Inicio (F)',
                name: 'fechaInicial',
                format: 'Y-m-d',
                editable: false,
                width: 130,
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                ],
                id: 'fecha-start-date',
                listeners: {
                    select: function (date) {
                        var date2 = Ext.getCmp('fecha-ended-date');
                        if (date.getValue() > date2.getValue()) {
                            date2.setValue();
                        }
                    }
                }
            },{
                xtype: 'datefield',
                emptyText: 'Final (F)',
                name: 'fechaFinal',
                format: 'Y-m-d',
                editable: false,
                width: 130,
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                ],
                id: 'fecha-ended-date',
                listeners: {
                    select: function (date) {
                        var date1 = Ext.getCmp('fecha-start-date');
                        if (date.getValue() < date1.getValue()) {
                            date1.setValue();
                        }
                    }
                }
            },'-',{
                tooltip: 'Quitar filtros.',
                iconCls: 'fa fa-filter'
            }   ]
        });
        me.progressbarpager = Ext.create('Ext.window.Window', {
            width: 640,
            header: false,
            tbar: [{
                xtype: 'pagingtoolbar',
                store: me.store,
                displayInfo: true,
                plugins: {
                    'ux-progressbarpager': true
                },
                padding: '0 0 0 0'
            }],
            id: 'progressbarpager-tarea-op'
        });
        me.callParent(arguments);
    }
});