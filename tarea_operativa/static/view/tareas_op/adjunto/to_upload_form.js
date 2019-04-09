
Ext.define('etecsa.view.tareas_op.adjunto.to_upload_form', {
    extend: 'Ext.window.Window',
    xtype: 'upload-window',

    title: 'Añadir adjunto',
    iconCls: 'x-fa fa-paperclip',
    layout: 'border',
    autoShow: true,
    width: 950,
    height: 373,
    resizable: false,
    modal: true,

    initComponent: function () { var me=this;
        me.items = [{
            region: 'center',
            xtype: 'form',
            url: '/tarea_operativa/to/upload/file_up',
            padding: '5 5 5 5',
            style: 'background-color: #fff;',
            width: 50,
            fieldDefaults: {
                anchor: '100%',
                allowBlank: false
            },
            items: [{
                xtype: 'fieldset',
                layout: 'anchor',
                padding: '5 5 5 5',
                items: [{
                    xtype: 'filefield',
                    emptyText: 'FICHERO',
                    name: 'file',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'fa fa-upload'
                    },
                    listeners: {
                        change: function(field, value){
                            var new_value = value.replace(/C:\\fakepath\\/g, '');
                            field.setRawValue(new_value);
                        }
                    },
                    anchor: '100%',
                    allowBlank: false
                },{
                    xtype: 'textareafield',
                    emptyText: 'DESCRIPCIÓN',
                    name: 'descripcion',
                    grow: true,
                    maxLength: 120,
                    height: 200
                },{
                    xtype: 'hiddenfield',
                    value: me.tarea_id,
                    name: 'tarea_operativa_pk'
                },{
                    xtype: 'hiddenfield',
                    value: me.ejecutante_pk,
                    name: 'ejecutante_pk'
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                padding: '5 5 5 5',
                items: [{
                    xtype: 'button',
                    text: 'Salvar',
                    iconCls: 'check',
                    action: me.button_action
                },{
                    xtype: 'tbspacer'
                },{
                    xtype: 'button',
                    iconCls: 'x-fa fa-trash',
                    listeners: {
                        click: function(){
                            me.down('form').reset();
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
            width: 700,
            height: 270,
            border: true,
            store: me.file_store,
            stateEvents: ['adjunto_download_action', 'adjunto_remove_action'],
            columns: [
                {text: 'Id', dataIndex: 'id', hidden: true},
                {text: 'Archivo', dataIndex: 'name', sortable: false, menuDisabled: true, flex: 6},
                {text: 'Tipo', dataIndex: 'extension', sortable: false, menuDisabled: true, width: 50},
                {text: 'Tamaño', dataIndex: 'size', sortable: false, menuDisabled: true, width: 75},
                {text: 'Creado', dataIndex: 'uploaded_at', sortable: false, menuDisabled: true, width: 145},
                {
                    xtype: 'actioncolumn', width: 70,
                    items: [{
                        iconCls: 'x-fa fa-cloud-download',
                        tooltip: 'Descargar archivo.',
                        handler: function (view, rowIndex, colIndex, item, e, record) {
                            view.grid.fireEvent('adjunto_download_action', record);
                        }
                    },'',{
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Elimanar Adjunto.',
                        handler: function (view, rowIndex, colIndex, item, e, record) {
                            view.grid.fireEvent('adjunto_remove_action', record);
                        }
                    }]
                }
            ],
             plugins: {
                rowexpander: {
                    rowBodyTpl: new Ext.XTemplate(
                        '<p><b>Nombre:</b><br> {name}</p>',
                        '<p><b>Descripción:</b><br> {descripcion}</p>'
                    )
                }
            }
        }];
        me.callParent(arguments);
    }
});