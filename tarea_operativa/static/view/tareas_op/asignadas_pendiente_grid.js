
Ext.define('etecsa.view.tareas_op.asignadas_pendiente_grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'asignadas-pendiente-grid',

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
    id: 'asignadas-pendiente-grid-id',

    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.to_asignadas_pendiente');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Creada',
            dataIndex: 'fecha',
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData) {
                metaData.tdStyle = 'background-color:rgba(236, 250, 225, 0.44);border:1px solid rgba(203, 218, 193, 0.83);';
                return value
            },
            width: 160
        },{
            text: 'Número',
            dataIndex: 'numero',
            sortable: false,
            menuDisabled: true,
            width: 100
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
            xtype: 'actioncolumn', width: 40, sortable: false, menuDisabled: true,
            items: [{
                iconCls: 'x-fa fa-braille',
                tooltip: 'Gestionar Tarea Operativa',
                handler: function (view, rowIndex, colIndex, item, e, record) {
                    view.grid.fireEvent('gestionar_grid_action', record);
                }
            }]
        }];
        me.tbar = Ext.create('Ext.toolbar.Toolbar',{
            height: 50,
            items: [{
                xtype: 'combobox',
                store: Ext.create('etecsa.store.to_categoria'),
                queryMode: 'local',
                displayField: 'nombre',
                width: 240,
                emptyText: 'FILTRAR=(CATEGORIA)',
                editable: false,
                id: 'to_categoria-combobox-asignadas-id'
            },'-','->',{
                xtype: 'datefield',
                emptyText: 'Inicio (F)',
                name: 'fechaInicial',
                format: 'Y-m-d',
                editable: false,
                width: 130,
                afterLabelTextTpl: [
                    '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                ],
                id: 'fecha-start-asignadas-date',
                listeners: {
                    select: function (date) {
                        var date2 = Ext.getCmp('fecha-ended-asignadas-date');
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
                id: 'fecha-ended-asignadas-date',
                listeners: {
                    select: function (date) {
                        var date1 = Ext.getCmp('fecha-start-asignadas-date');
                        if (date.getValue() < date1.getValue()) {
                            date1.setValue();
                        }
                    }
                }
            },'-',{
                tooltip: 'Quitar filtros.',
                iconCls: 'fa fa-filter'
            }]
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
            id: 'progressbarpager-asignadas-tarea-op'
        });
        me.callParent(arguments);
    }
});