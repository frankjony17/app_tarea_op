
Ext.define('etecsa.view.departamento.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'departamento-grid',
    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    scrollable: true,
    
    initComponent: function() { var me = this;
        me.store = Ext.create('etecsa.store.departamento');
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
            text: 'Código',
            dataIndex: 'codigo',
            editor: {
                xtype: 'textfield',
                maskRe: /[0-9]/,
                regex: /[0-9]/,
                maxLength: 10,
                allowBlank: false
            },
            flex: 1
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            editor: {
                xtype: 'textfield',
                maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                regex: /[aA-zZ]/,
                maxLength: 80,
                allowBlank: false
            },
            flex: 4
        }];
        me.tbar = [{
            text: 'Adicionar',
            iconCls: 'fa fa-plus',
            tooltip: 'Adicionar Departamento'
        },'-',{
            text: 'Eliminar',
            iconCls: 'trash',
            tooltip: 'Eliminar Departamento'
        }];
        me.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            saveBtnText: 'Editar',
            cancelBtnText: 'Cancelar'
        }); 
        me.callParent(arguments);
    }
});