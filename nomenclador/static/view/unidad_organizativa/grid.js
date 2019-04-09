
Ext.define('etecsa.view.unidad_organizativa.grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'unidad-organizativa-grid',
    width: '100%',
    border: false,
    scrollable: true,
    selType: 'checkboxmodel',
    initComponent: function() {
        var me = this;
        me.store = Ext.create('etecsa.store.unidad_organizativa');
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
        },{
            text: 'Acrónimo',
            dataIndex: 'acronimo',
            editor: {
                xtype: 'textfield',
                maskRe: /[A-Z]/,
                regex: /[A-Z]/,
                maxLength: 13,
                allowBlank: false
            },
            flex: 1,
            renderer: function(val) {
                return '<b>'+ val +'</b>';
            }
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
        }];
        me.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            saveBtnText: 'Editar',
            cancelBtnText: 'Cancelar'
        });
        me.tbar = [{
            text: 'Adicionar',
            iconCls: 'fa fa-plus',
            tooltip: 'Adicionar Unidad Organizativa'
        },'-',{
            text: 'Eliminar',
            iconCls: 'trash',
            tooltip: 'Eliminar Unidad Organizativa'
        }];
        me.callParent(arguments);
    }
});