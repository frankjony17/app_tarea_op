
Ext.define('etecsa.store.to_prorroga', {
    extend: 'Ext.data.Store',
    fields: ['id', 'fecha', 'fecha_ended_to', 'prorroga', 'motivo', 'tarea_operativa_pk'],

    sorters: ['fecha'],
    proxy : {
        url: '/tarea_operativa/to/prorroga/list',
        type : 'ajax'
    }
});