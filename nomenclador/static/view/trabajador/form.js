
Ext.define('etecsa.view.trabajador.form', {
    extend: 'Ext.window.Window',
    xtype: 'trabajador-win',
    iconCls: 'x-fa fa-university',
    layout: 'fit',
    buttonAlign: 'center',
    width: 700,
    resizable: false,
    modal: true,

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            url: me.url,
            padding: '10 10 10 10',
            border: false,
            style: 'background-color: #fff;',
            fieldDefaults: {
                labelAlign: 'top'
            },
            items: [{
                xtype: 'fieldset',
                layout: 'hbox',
                items: [{
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
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    emptyText: 'NOMBRE',
                    name: 'nombre',
                    anchor: '100%',
                    maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                    regex: /[aA-zZ]/,
                    maxLength: 48,
                    allowBlank: false,
                    margin: '0 5 0 0',
                    flex: 3
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Apellidos',
                    emptyText: 'APELLIDOS',
                    name: 'apellidos',
                    anchor: '100%',
                    maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                    regex: /[aA-zZ]/,
                    maxLength: 48,
                    allowBlank: false,
                    flex: 3
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Departamento',
                    emptyText: 'DEPARTAMENTO',
                    store: Ext.create('etecsa.store.departamento'),
                    editable: false,
                    allowBlank: false,
                    displayField: 'nombre',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{nombre}: {codigo}"><b>({codigo})</b> {nombre}</div>'
                        ]
                    },
                    margin: '0 5 0 0',
                    name: 'departamento',
                    flex: 1
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Unidad Organizativa',
                    emptyText: 'UNIDAD ORGANIZATIVA',
                    store: Ext.create('etecsa.store.unidad_organizativa'),
                    editable: false,
                    allowBlank: false,
                    displayField: 'nombre',
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{nombre}: {codigo}">{nombre}</b></div>'
                        ]
                    },
                    name: 'unidad_organizativa',
                    flex: 1
                }]
            },{
                xtype: 'hiddenfield',
                value: me.trabajador_id,
                name: 'trabajador_id'
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