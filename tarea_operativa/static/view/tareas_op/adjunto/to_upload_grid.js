
Ext.define('etecsa.view.tareas_op.adjunto.to_upload_grid', {
    extend: 'Ext.window.Window',
    xtype: 'upload-grid',

    title: 'Añadir adjunto',
    iconCls: 'x-fa fa-paperclip',
    layout: 'fit',
    autoShow: true,
    width: 820,
    height: 310,
    resizable: false,
    modal: true,

    initComponent: function () {
        var me=this;
        me.items = [{
            xtype: 'grid',
            width: '100%',
            border: true,
            store: me.file_store,
            stateEvents: 'adjunto_download_action',
            columns: [
                {text: 'Id', dataIndex: 'id', hidden: true},
                {text: 'Archivo', dataIndex: 'name', sortable: false, menuDisabled: true, flex: 6},
                {text: 'Tipo', dataIndex: 'extension', sortable: false, menuDisabled: true, width: 50},
                {text: 'Tamaño', dataIndex: 'size', sortable: false, menuDisabled: true, width: 75},
                {text: 'Creado', dataIndex: 'uploaded_at', sortable: false, menuDisabled: true, width: 145},
                {
                    xtype: 'actioncolumn', width: 40,
                    items: [{
                        iconCls: 'x-fa fa-cloud-download',
                        tooltip: 'Descargar archivo.',
                        handler: function (view, rowIndex, colIndex, item, e, record) {
                            view.grid.fireEvent('adjunto_download_action', record);
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