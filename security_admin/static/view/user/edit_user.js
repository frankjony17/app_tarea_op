
Ext.define('etecsa.view.user.edit_user', {
    extend: 'Ext.window.Window',
    xtype: 'edit-user-window',
    title: 'Editar <b>(USUARIO)</b>',
    iconCls: 'x-fa fa-user-md',
    layout: 'fit',
    resizable: false,
    closable: false,
    modal: true,
    width: 417,
    autoShow: true,

    initComponent: function () { var me = this;
        me.items = [{
            xtype: 'form',
            url: '/security_admin/user/edit',
            padding: '10 10 10 10',
            fieldDefaults: { labelAlign: 'top', margin: 2 },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Username',
                emptyText: 'Alias del usuario.',
                anchor: '100%',
                maskRe: /[a-z\.\ñ\á\é\í\ó\ú]/,
                regex: /[a-z]/,
                maxLength: 25,
                allowBlank: false,
                value: me.me_record.get('username'),
                name: 'username'
            },{
                xtype: 'textfield',
                fieldLabel: 'Emil',
                emptyText: 'emil',
                anchor: '100%',
                vtype:'email',
                maxLength: 120,
                allowBlank: false,
                value: me.me_record.get('email'),
                name: 'email'
            },{
                xtype: 'hiddenfield',
                value: me.me_record.get('id'),
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