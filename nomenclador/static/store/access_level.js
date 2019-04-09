
Ext.define('etecsa.store.access_level', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nivel', 'descripcion'],
    autoLoad: true,
    proxy : {
        url: '/nomenclador/access_level/list',
        type : 'ajax'
    }
});