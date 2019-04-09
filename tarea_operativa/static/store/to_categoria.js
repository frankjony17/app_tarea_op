
Ext.define('etecsa.store.to_categoria', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'descripcion'],
    sorters: ['nombre'],
    proxy : {
        url: '/tarea_operativa/categoria/list',
        type : 'ajax'
    },
    autoLoad: true
});