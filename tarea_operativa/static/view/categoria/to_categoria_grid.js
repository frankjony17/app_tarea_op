
Ext.define('etecsa.view.categoria.to_categoria_grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'categoria-grid',
    width: '100%',
    selModel: 'checkboxmodel',
    columnLines: true,

    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.to_categoria');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            editor: {
                xtype: 'textfield',
                maxLength: 32,
                allowBlank: false
            },
            flex: 1
        },{
            text: 'Descripción',
            dataIndex: 'descripcion',
            editor: {
                xtype: 'textfield',
                maxLength: 120,
                allowBlank: false
            },
            flex: 4
        }];
        me.tbar = [{
            text: 'Adicionar',
            iconCls: 'fa fa-plus',
            tooltip: 'Adicionar Categoría'
        },'-',{
            text: 'Eliminar',
            iconCls: 'trash',
            tooltip: 'Eliminar Categoría'
        }];
        me.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            saveBtnText: 'Editar',
            cancelBtnText: 'Cancelar'
        });
        me.callParent(arguments);
    }
});