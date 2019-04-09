
Ext.define('etecsa.view.user.permission_user', {
    extend: 'Ext.window.Window',
    xtype: 'permission-user-window',
    title: 'Asignar/Quitar <b>(PERMISOS)</b>',
    iconCls: 'x-fa fa-credit-card',
    layout: 'fit',
    resizable: false,
    closable: true,
    modal: true,
    width: 640,
    height: 310,
    autoShow: true,
    initComponent: function () { var me = this;
        me.permission_store = Ext.create('etecsa.store.not_permission');
        me.permission_store.load({ params: { id: me.user_id }});
        me.items = Ext.create('Ext.grid.Panel', {
            border: false,
            autoScroll: true,
            store: me.permission_store,
            columns: [
                { text: 'Id', dataIndex: 'id', width: 35, hidden: true },
                { text: 'Permiso', dataIndex: 'codename', flex: 1 },
                { text: 'Descripción', dataIndex: 'name', flex: 1 },
                {
                    xtype: 'checkcolumn',
                    dataIndex: 'have_perm',
                    width: 40,
                    id: 'checkcolumn-permission'
                }
            ]
        });
        me.callParent(arguments);
    }
});