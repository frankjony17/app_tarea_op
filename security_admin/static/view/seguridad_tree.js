
Ext.define('etecsa.view.seguridad_tree', {
    extend: 'Ext.list.Tree',
    xtype: 'tree-seguridad',
    store: {
        root: {
            expanded: true,
            children: [{
                text: '<b>Permisos</b>',
                iconCls: 'x-fa fa-credit-card',
                leaf: true
            },{
                text: '<b>Grupos</b>',
                iconCls: 'x-fa fa-group',
                leaf: true
            },{
                text: '<b>Usuarios</b>',
                iconCls: 'x-fa fa-user',
                leaf: true
            }]
        }
    }
});