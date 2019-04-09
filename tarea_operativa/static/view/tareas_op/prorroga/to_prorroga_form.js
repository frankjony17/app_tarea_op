
Ext.define('etecsa.view.tareas_op.prorroga.to_prorroga_form', {
    extend: 'Ext.window.Window',
    xtype: 'to-prorroga-win',

    title: 'Prorroga',
    iconCls: 'x-fa fa-calendar',
    layout: 'border',
    autoShow: true,
    width: 800,
    height: 420,
    resizable: false,
    closable: false,
    modal: true,

    initComponent: function () { var me=this, date=new Date();
        me.prorroga_store = Ext.create('etecsa.store.to_prorroga');
        me.prorroga_store.load({ params: { id: me.tarea_id }});
        me.items = [{
            region: 'center',
            xtype: 'form',
            url: '/tarea_operativa/to/prorroga/add',
            padding: '5 5 5 5',
            style: 'background-color: #fff;',
            fieldDefaults: {
                anchor: '100%',
                allowBlank: false
            },
            items: [{
                xtype: 'fieldset',
                layout: 'anchor',
                padding: '5 5 5 5',
                title: 'Prorroga',
                items: [{
                    xtype: 'datefield',
                    emptyText: 'PRORROGA "Y-m-d"',
                    name: 'prorroga',
                    format: 'Y-m-d',
                    editable: false,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                },{
                    xtype: 'textareafield',
                    emptyText: 'MOTIVO',
                    name: 'motivo',
                    grow: true,
                    maxLength: 120,
                    height: 205
                },{
                    xtype: 'hiddenfield',
                    value: me.tarea_id,
                    name: 'tarea_operativa_pk'
                },{
                    xtype: 'hiddenfield',
                    name: 'id'
                },{
                    xtype: 'hiddenfield',
                    name: 'fecha'
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                items: [{
                    xtype: 'button',
                    text: 'Salvar',
                    iconCls: 'check'
                },{
                    xtype: 'tbspacer'
                },{
                    xtype: 'button',
                    text: 'Editar',
                    iconCls: 'x-fa fa-edit'
                },{
                    xtype: 'tbspacer'
                },{
                    xtype: 'button',
                    iconCls: 'x-fa fa-trash',
                    listeners: {
                        click: function(button){
                            var form = button.up('form');
                            form.down('[name=motivo]').setValue();
                            form.down('[name=prorroga]').setValue();
                        }
                    }
                },{
                    xtype: 'tbfill'
                },{
                    xtype: 'button',
                    text: 'Cancelar',
                    iconCls: 'close',
                    listeners: {
                        click: function(){
                            me.close();
                        }
                    }
                }]
            }]
        },{
            region: 'west',
            xtype: 'grid',
            width: 450,
            height: 370,
            selModel: {
                type: 'cellmodel'
            },
            autoScroll: true,
            columnLines: true,
            store: me.prorroga_store,
            stateEvents: 'remove_grid_action',
            columns: [
                {xtype: 'rownumberer', text: 'No', width: 40, align: 'center'},
                {text: 'Id', dataIndex: 'id', hidden: true},
                {text: 'pk', dataIndex: 'tarea_operativa_pk', hidden: true},
                {
                    text: 'Fecha',
                    columns: [{
                        text: 'Creada', dataIndex: 'fecha', sortable: false, menuDisabled: true, width: 160,
                        renderer: function (value, metaData) {
                            metaData.tdStyle = 'background-color:rgba(79, 79, 79, 0.25);';
                            return '<b>'+ value +'</b>'
                        }
                    }, {
                        text: 'Anterior', dataIndex: 'fecha_ended_to', sortable: false, menuDisabled: true, width: 90
                    }, {
                        text: 'Prorroga', dataIndex: 'prorroga', sortable: false, menuDisabled: true, width: 130,
                        renderer: function (value, metaData) {
                            metaData.tdStyle = 'background-color:rgba(255,67,69,0.2);border:1px solid rgba(255, 67, 69, 0.44);';
                            return '<b>'+ value +'</b>'
                        }
                    }]
                },
                {
                    xtype: 'actioncolumn', width: 25, sortable: false, menuDisabled: true,
                    items: [{
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Elimanar registro (Solo si fue creado el: <b>' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '</b>).',
                        handler: function (view, rowIndex, colIndex, item, e, record) {
                            var value_date=record.get('fecha').split('-'),
                                create_date=new Date(value_date[0],parseInt(value_date[1]) - 1,parseInt(value_date[2]));
                            if (parseInt(create_date.getFullYear()) === parseInt(date.getFullYear())) {
                                if (parseInt(create_date.getMonth()) === parseInt(date.getMonth())) {
                                    if (parseInt(create_date.getDate()) === parseInt(date.getDate())) {
                                        view.grid.fireEvent('remove_grid_action', record);
                                    } else {
                                        Me.msg.question('Solo se puede eliminar una Prorroga el día que fue creada..');
                                    }
                                } else {
                                    Me.msg.question('Solo se puede eliminar una Prorroga el día que fue creada..');
                                }
                            } else {
                                Me.msg.question('Solo se puede eliminar una Prorroga el día que fue creada..');
                            }
                        }
                    }]
                }
            ]
        }];
        me.callParent(arguments);
    }
});