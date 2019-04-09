
Ext.define('etecsa.view.nivel_acceso.form', {
    extend: 'Ext.window.Window',
    xtype: 'access_level-win',

    title: 'Adicionar Nivel de Acceso',
    iconCls: 'x-fa fa-sitemap',
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
            url: '/nomenclador/access_level/add',
            padding: '10 10 10 10',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top', anchor: '100%', allowBlank: false
            },
            items: [{
                xtype: 'numberfield',
                fieldLabel: 'Nivel de Acceso',
                emptyText: 'NIVEL DE ACCESO',
                name: 'nivel',
                value: 0,
                maxValue: 17,
                minValue: 0
            },{
                xtype: 'textfield',
                fieldLabel: 'Descripción',
                emptyText: 'DESCRIPCIÓN',
                name: 'descripcion',
                maxLength: 74
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