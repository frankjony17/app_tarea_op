
Ext.define('etecsa.view.nomenclador_tree', {
    extend: 'Ext.list.Tree',
    xtype: 'tree-nomenclador',
    store: {
        root: {
            expanded: true,
            children: [{
                text: '<b>Unidad Organizativa</b>',
                iconCls: 'x-fa fa-building',
                leaf: true
            },{
                text: '<b>Departamento</b>',
                iconCls: 'x-fa fa-university',
                leaf: true
            },{
                text: '<b>Trabajador</b>',
                iconCls: 'x-fa fa-user-secret',
                leaf: true
            },{
                text: '<b>Nivel de Acceso</b>',
                iconCls: 'x-fa fa-sitemap',
                leaf: true
            }]
        }
    }
});