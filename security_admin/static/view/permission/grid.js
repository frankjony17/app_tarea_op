
Ext.define('etecsa.view.permission.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'permission-grid',
    width: '100%',
    border: false,
    initComponent: function() {
        var me = this;
        me.store = Ext.create('etecsa.store.permission');
        me.columns = [{
            xtype: 'rownumberer',
            text: 'No',
            width: 40,
            align: 'center'
        },{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Permiso',
            dataIndex: 'codigo',
            renderer: function(val) {
                return '<b>'+ val +'</b>';
            },
            flex: 2
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 3

        },{
            text: 'Modulo',
            dataIndex: 'app_label',
            flex: 1
        }];
        me.callParent(arguments);
    }
});