
Ext.define('etecsa.store.to_upload', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name', 'extension', 'size', 'descripcion', 'uploaded_at'],

    sorters: ['uploaded_at'],
    proxy : {
        url: '/tarea_operativa/to/upload/file_list',
        type : 'ajax'
    }
});