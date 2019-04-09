
Ext.define('etecsa.store.departamento', {
    extend: 'Ext.data.Store',
    fields: ['id', 'codigo', 'nombre'],
    autoLoad: true,
    proxy : {
        url: '/nomenclador/departamento/list',
        type : 'ajax'
    }
});