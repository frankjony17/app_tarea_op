
Ext.define('etecsa.store.to_ejecutante', {
    extend: 'Ext.data.Store',
    fields: [
        'id',
        'fecha',
        'estado',
        'ejecutante',
        'observacion',
        'requiere_adjunto',
        'acciones',
        'ultima_entrada',
        'tarea_operativa_pk'
    ],

    sorters: ['ejecutante'],
    proxy : {
        url: '/tarea_operativa/to/ejecutante/list',
        type : 'ajax'
    },
    autoLoad: true,
});