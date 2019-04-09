
Ext.define('etecsa.view.nivel_acceso.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'access_level-grid',
    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    scrollable: true,
    
    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.access_level');
        me.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Nivel',
            dataIndex: 'nivel',
            editor: {
                xtype: 'numberfield',
                name: 'nivel',
                value: 0,
                maxValue: 17,
                minValue: 0,
                allowBlank: false
            },
            flex: 1
        },{
            text: 'Descripción',
            dataIndex: 'descripcion',
            editor: {
                xtype: 'textfield',
                maxLength: 74,
                allowBlank: false
            },
            flex: 4
        }];
        me.tbar = [{
            text: 'Adicionar',
            iconCls: 'fa fa-plus',
            tooltip: 'Adicionar Nivel de Acceso'
        },'-',{
            text: 'Eliminar',
            iconCls: 'trash',
            tooltip: 'Eliminar Nivel de Acceso'
        }];
        me.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            saveBtnText: 'Editar',
            cancelBtnText: 'Cancelar'
        }); 
        me.callParent(arguments);
    }
});