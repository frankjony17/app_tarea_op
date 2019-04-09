
Ext.define('etecsa.view.user.access_level', {
    extend: 'Ext.window.Window',
    xtype: 'access-level-window',
    title: 'Nivel de Acceso <b>(NA)</b>',
    iconCls: 'x-fa fa-sitemap',
    layout: 'fit',
    resizable: false,
    closable: false,
    modal: true,
    width: 417,
    autoShow: true,

    initComponent: function () { var me = this;
        me.items = [{
            xtype: 'form',
            url: '/security_admin/user/access_level',
            padding: '10 10 10 10',
            fieldDefaults: { labelAlign: 'top', margin: 2 },
            items: [{
                xtype: 'combobox',
                store: Ext.create('etecsa.store.access_level'),
                anchor: '100%',
                editable: false,
                emptyText: 'NIVEL DE ACCESO',
                allowBlank: false,
                displayField: 'nivel',
                valueField: 'id',
                listConfig: {
                    itemTpl: [
                        '<div data-qtip="{nivel}: {descripcion}"><b>({nivel})</b> {descripcion}</div>'
                    ]
                }, name: 'accl_id'
            },{
                xtype: 'hiddenfield',
                value: me.user_id,
                name: 'id'
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