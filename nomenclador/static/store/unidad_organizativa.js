
Ext.define('etecsa.store.unidad_organizativa', {
    extend: 'Ext.data.Store',
    fields: ['id', 'codigo', 'nombre', 'acronimo'],
    autoLoad: true,
    proxy : {
        url: '/nomenclador/unidad_organizativa/list',
        type : 'ajax'
    }
});