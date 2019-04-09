
Ext.define('etecsa.view.unidad_organizativa.form', {
    extend: 'Ext.window.Window',
    xtype: 'unidad-organizativa-win',

    title: 'Adicionar Unidad Organizativa',
    iconCls: 'x-fa fa-building',
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
            url: '/nomenclador/unidad_organizativa/add',
            padding: '10 10 10 10',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'fieldset',
                layout: 'anchor',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    emptyText: 'NOMBRE',
                    name: 'nombre',
                    anchor: '100%',
                    maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                    regex: /[aA-zZ]/,
                    maxLength: 80,
                    allowBlank: false,
                    margin: '0 5 0 0'
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Acronimo',
                    emptyText: 'ACRONIMO',
                    name: 'acronimo',
                    anchor: '100%',
                    maskRe: /[A-Z]/,
                    regex: /[A-Z]/,
                    maxLength: 13,
                    allowBlank: false,
                    margin: '0 5 0 0',
                    flex: 1
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Código',
                    emptyText: 'CÓDIGO',
                    name: 'codigo',
                    anchor: '100%',
                    maskRe: /[0-9]/,
                    regex: /[0-9]/,
                    maxLength: 10,
                    allowBlank: false,
                    margin: '0 5 0 0',
                    flex: 1
                }]
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