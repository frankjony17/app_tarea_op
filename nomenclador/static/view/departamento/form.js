
Ext.define('etecsa.view.departamento.form', {
    extend: 'Ext.window.Window',
    xtype: 'departamento-win',

    title: 'Adicionar Departamento',
    iconCls: 'x-fa fa-university',
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
            url: '/nomenclador/departamento/add',
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