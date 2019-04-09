
Ext.define('etecsa.view.user.form', {
    extend: 'Ext.window.Window',
    xtype: 'user-window',
    title: 'Adicionar Usuario',
    iconCls: 'x-fa fa-user-plus',
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager'
    ],
    layout: 'fit',
    modal: true,
    autoShow: true,
    resizable: false,
    width: 730,
    height: 470,
    y: 20,

    initComponent: function () { var me = this;
        me.store = Ext.create('etecsa.store.trabajador_no_user');
        me.items = Ext.create('Ext.grid.Panel', {
            autoScroll: true,
            store: me.store,
            columnLines: true,
            animCollapse: true,
            selModel: 'checkboxmodel',
            columns: [{
                text: 'Id',
                dataIndex: 'id',
                width: 35,
                hidden: true
            },{
                text: 'Nombre y Apellidos',
                dataIndex: 'nombre',
                flex: 3

            },{
                text: 'Posible USERNAME',
                dataIndex: 'username',
                flex: 1
            }],
            tbar: [{
                xtype: 'combobox',
                emptyText: 'FILTRAR POR: Unidad Organizativa',
                store: Ext.create('etecsa.store.unidad_organizativa'),
                queryMode: 'local',
                displayField: 'nombre',
                valueField: 'id',
                typeAhead: true,
                flex: 1
            },'-',{
                tooltip: 'Limpiar filtro.',
                iconCls: 'x-fa fa-trash'
            }],
            bbar: [{
                text: 'Cargar',
                tooltip: 'Crear usuarios.',
                iconCls: 'x-fa fa-download'
            },'-','->',{
                xtype: 'pagingtoolbar',
                store: me.store,
                displayInfo: true,
                plugins: {
                    'ux-progressbarpager': true
                }
            }]
        });
        me.callParent(arguments);
    }
});