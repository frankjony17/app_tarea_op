
Ext.define('etecsa.view.tareas_op.periodo_chequeo.to_periodo_chequeo_form', {
    extend: 'Ext.window.Window',
    xtype: 'to-periodo-chequeo-win',

    title: 'Periodo de Chequeo',
    iconCls: 'x-fa fa-tasks',
    layout: 'border',
    width: 750,
    resizable: false,
    closable: true,
    modal: true,
    y: 50,

    initComponent: function () { var me=this;
        me.periodo_chequeo_store = Ext.create('etecsa.store.to_periodo_chequeo');
        me.periodo_chequeo_store.load({ params: { id: me.tarea_id }});
        me.fecha_store = Ext.create('Ext.data.ArrayStore', {
            fields: ['id', 'fecha']
        });
        me.panel = Ext.create('Ext.panel.Panel', {
            frame: true,
            height: 145,
            bodyPadding: 5
        });
        me.items = [{
            region: 'north',
            layout: 'hbox',
            padding: '5 5 0 5',
            items: [{
                xtype: 'grid',
                name: 'grid-periodo-chequeo',
                width: '100%',
                border: true,
                store: me.periodo_chequeo_store,
                stateEvents: 'remove_grid_action',
                columns: [
                    {text: 'id', dataIndex: 'id', hidden: true},
                    {text: 'pk', dataIndex: 'tarea_operativa_pk', hidden: true},
                    {text: 'Periodo (CH)',dataIndex: 'periodo',sortable: false,menuDisabled:true,flex:1,renderer: function (value){return '<span style="color: green"><b>' + value + '</b></span>'}},
                    {text: 'Días (Sem)', dataIndex: 'dia_semana', sortable: false, menuDisabled: true, flex: 2},
                    {text: 'Fechas (CH)',dataIndex: 'fecha_especifica',sortable: false,menuDisabled: true,flex: 2},
                    {
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
            }]
        },{
            region: 'west',
            width: 200,
            xtype: 'form',
            name: 'form-periodo',
            padding: '0 5 0 5',
            style: 'background-color: #fff;',
            fieldDefaults: {
                anchor: '100%',
                allowBlank: false
            },
            items: [{
                xtype: 'fieldset',
                layout: 'anchor',
                padding: '0 5 0 5',
                title: 'Periodo',
                name: 'periodo',
                height: 112,
                items: [{
                    xtype: 'combobox',
                    store: [
                        {id: 1, name:'DIARIO', html:'Se css s s s s dias', el: 'Di'},
                        {id: 2, name:'SEMANAL', html:'Semanal', el: 'Se'},
                        {id: 3, name:'QUINCENAL', html:'Quincenal', el: 'Qu'},
                        {id: 4, name:'MENSUAL', html:'Mensual', el: 'Me'},
                        {id: 5, name:'TRIMESTRAL', html:'Trimestral', el: 'Tr'},
                        {id: 6, name:'ANUAL', html:'Anual', el: 'An'},
                        {id: 7, name:'FECHA-FINAL', html:'Por-fecha-final', el: 'FF'},
                        {id: 8, name:'FECHA-ESPECIFICA', html:'Por-fechas-especificas', el: 'FE'}
                    ],
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'el',
                    emptyText: 'PERIODO',
                    editable: false,
                    listeners: {
                        select: function(combo, record){
                            var id = record.get('id');
                            me.down('[xtype=tagfield]').setDisabled(false);
                            me.down('[name=grid-fecha]').setDisabled(false);
                            me.down('[text=Salvar]').setDisabled(false);
                            if (id == 1 || id == 7) {
                                me.down('[xtype=tagfield]').setDisabled(true);
                                me.down('[name=grid-fecha]').setDisabled(true);
                            } else if (id == 2 || id == 3 || id == 4 || id == 5 || id == 6) {
                                me.down('[name=grid-fecha]').setDisabled(true);
                            } else if (id == 8) {
                                me.down('[xtype=tagfield]').setDisabled(true);
                            }
                            me.panel.update(record.get('html'));
                        }
                    },
                    flex: 1
                },{
                    xtype: 'hiddenfield',
                    value: me.tarea_id,
                    name: 'tarea_operativa_pk'
                }]
            },{
                xtype: 'fieldset',
                layout: 'anchor',
                padding: '0 5 5 5',
                title: 'Ayuda rápida',
                name: 'ayuda_rapida',
                items: me.panel
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                items: [{
                    xtype: 'button',
                    text: 'Salvar',
                    iconCls: 'check',
                    disabled: true
                },{
                    xtype: 'tbspacer'
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
            region: 'center',
            xtype: 'form',
            name: 'form-dia-semana',
            padding: '0 5 5 5',
            style: 'background-color: #fff;',
            fieldDefaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'fieldset',
                layout: 'anchor',
                padding: '0 5 0 5',
                title: 'Días de la semana',
                name: 'dias_de_la_semana',
                height: 112,
                items: {
                    xtype: 'tagfield',
                    store: [
                        {'el': "Lu", 'name': "lunes" },
                        {'el': "Ma", 'name': "martes" },
                        {'el': "Mi", 'name': "miércoles" },
                        {'el': "Ju", 'name': "jueves" },
                        {'el': "Vi", 'name': "viernes" }
                    ],
                    emptyText: 'DÍA DE LA SEMANA',
                    displayField: 'name',
                    valueField: 'el',
                    queryMode: 'local',
                    editable: false,
                    selectOnFocus: false
                }
            },{
                xtype: 'fieldset',
                layout: 'anchor',
                padding: '0 5 5 5',
                title: 'Fechas especificas',
                name: 'fechas_especificas',
                items: [{
                    xtype: 'grid',
                    name: 'grid-fecha',
                    height: 195,
                    width: '100%',
                    border: true,
                    store: me.fecha_store,
                    columns: [
                        {text:'Fechas',dataIndex:'fecha',sortable:false,menuDisabled:true,flex:1},
                        {xtype: 'actioncolumn', width: 25, sortable: false, menuDisabled: true,
                            items: [{
                                iconCls: 'x-fa fa-trash',
                                tooltip: 'Quitar fecha.',
                                handler: function (view, rowIndex, colIndex, item, e, record ) {
                                    me.fecha_store.removeAt(rowIndex);
                                }
                            }]
                        }
                    ],
                    bbar: ['->',{
                        xtype: 'datefield',
                        emptyText: 'DÍA DE CHEQUEO',
                        format: 'Y-m-d',
                        editable: false,
                        listeners: {
                            select: function(combo){
                                me.fecha_store.add({'id':Ext.util.Format.date(combo.value), 'fecha': Ext.util.Format.date(combo.value, 'Y-m-d')});
                                combo.setValue();
                            }
                        }
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }
});