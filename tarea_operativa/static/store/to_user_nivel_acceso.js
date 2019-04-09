
Ext.define('etecsa.store.to_user_nivel_acceso', {
    extend: 'Ext.data.Store',
    fields: ['id', 'username', 'unidad_organizativa'],

    sorters: ['username'],
    proxy : {
        url: '/tarea_operativa/to/ejecutante/lis_user_by_level_access',
        type : 'ajax'
    }
});