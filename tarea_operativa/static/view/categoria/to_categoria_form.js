
Ext.define('etecsa.view.categoria.to_categoria_form', {
    extend: 'Ext.window.Window',
    xtype: 'categoria-win',

    title: 'Adicionar Categoría',
    iconCls: 'x-fa fa-map-signs',
    layout: 'fit',
    autoShow: true,
    buttonAlign: 'center',
    width: 640,
    resizable: false,
    modal: true,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: '/tarea_operativa/categoria/add',
            padding: '10 10 10 10',
            fieldDefaults: {
                labelAlign: 'top',
                anchor: '100%',
                allowBlank: false
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Nombre',
                emptyText: 'NOMBRE',
                name: 'nombre',
                maxLength: 32
            },{
                xtype: 'textareafield',
                grow: true,
                fieldLabel: 'Descripción',
                emptyText: 'DESCRIPCIÓN',
                name: 'descripcion',
                maxLength: 120
            }]
        }];
        me.buttons = [{
            text: 'Salvar',
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