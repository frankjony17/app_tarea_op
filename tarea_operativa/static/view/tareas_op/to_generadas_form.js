
Ext.define('etecsa.view.tareas_op.to_generadas_form', {
    extend: 'Ext.window.Window',
    xtype: 'to-generadas-window',

    iconCls: 'x-fa fa-tag',
    layout: 'fit',
    width: 768,
    resizable: false,
    modal: true,

    initComponent: function () { var me = this;
        me.items = [{
            xtype: 'form',
            url: me.url,
            padding: '5 5 0 5',
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top',
                anchor: '100%'
            },
            items: [{
                xtype: 'fieldset',
                layout: 'anchor',
                padding: '5 5 5 5',
                title: 'Categoría / Tarea Operativa',
                items: [{
                    xtype: 'combobox',
                    store: Ext.create('etecsa.store.to_categoria'),
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    name: 'categoria_id',
                    emptyText: 'CATEGORÍA',
                    editable: false,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{nombre}: {descripcion}"><b>{nombre}</b> {descripcion}</div>'
                        ]
                    },
                    allowBlank: true,
                    flex: 1
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                title: 'Fecha (Inicial - Final)',
                items: [{
                    xtype: 'datefield',
                    emptyText: 'Inicio (F)',
                    format: 'Y-m-d',
                    editable: false,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ],
                    name: 'fecha_start',
                    id: 'fecha-start-date-form',
                    listeners: {
                        select: function (date) {
                            var date2 = Ext.getCmp('fecha-ended-date-form');
                            if (date.getValue() > date2.getValue()) {
                                date2.setValue();
                            }
                        }
                    },
                    allowBlank: false,
                    margin: '0 5 0 0',
                    flex: 1
                },{
                    xtype: 'datefield',
                    emptyText: 'Final (F)',
                    format: 'Y-m-d',
                    editable: false,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ],
                    name: 'fecha_ended',
                    id: 'fecha-ended-date-form',
                    listeners: {
                        select: function (date) {
                            var date1 = Ext.getCmp('fecha-start-date-form');
                            if (date.getValue() < date1.getValue()) {
                                date1.setValue();
                            }
                        }
                    },
                    allowBlank: false,
                    flex: 1
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                title: 'Descripción',
                items: [{
                    xtype: 'textareafield',
                    emptyText: 'DESCRIPCIÓN',
                    grow: true,
                    name: 'descripcion',
                    allowBlank: false,
                    flex: 1
                }]
            },{
                xtype: 'hiddenfield',
                value: me.tarea_id,
                name: 'pk'
            }]
        }];
        me.buttons = [{
            text: me.button_text,
            iconCls: 'check'
        },{
            text: 'Cancelar',
            iconCls: 'close',
            listeners: {
                click: function(){
                    me.close();
                }
            }
        }];
        me.callParent(arguments);
    }
});