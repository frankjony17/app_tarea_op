
Ext.define('etecsa.store.to_asignadas_pendiente', {
    extend: 'Ext.data.Store',
    fields: [
        'id',
        'fecha',
        'numero',
        'fecha_start',
        'fecha_ended',
        'descripcion',
        'categoria',
        'categoria_id',
        'periodo_chequeo',
        'adjunto_length',
        'ejecutante_id'
    ],
    pageSize: 20,
    sorters: ['fecha'],
    groupField: 'categoria',
    proxy: {
        type: 'ajax',
        url: '/tarea_operativa/to/asignadas_list',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    autoLoad: true
});