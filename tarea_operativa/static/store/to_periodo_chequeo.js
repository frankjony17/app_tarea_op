
Ext.define('etecsa.store.to_periodo_chequeo', {
    extend: 'Ext.data.Store',
    fields: ['id', 'periodo', 'dia_semana', 'fecha_especifica', 'tarea_operativa_pk'],

    sorters: ['periodo'],
    proxy : {
        url: '/tarea_operativa/to/periodo_chequeo/list',
        type : 'ajax'
    }
});