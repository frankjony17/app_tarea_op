
Ext.define('etecsa.store.to_generadas_pendiente', {
    extend: 'Ext.data.Store',
    fields: [
        'id',
        'fecha',
        'numero',
        'fecha_start',
        'fecha_ended',
        'descripcion',
        'publica',
        'categoria',
        'categoria_id',
        'prorroga_length',
        'periodo_chequeo',
        'ejecutante_length',
        'adjunto_length',
        'progress',
        'e_c',
        'e_i'
    ],
    pageSize: 20,
    sorters: ['fecha','numero'],
    groupField: 'categoria',
    proxy: {
        type: 'ajax',
        url: '/tarea_operativa/to/generadas_list',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
});