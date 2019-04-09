
Ext.define('etecsa.store.trabajador', {
    extend: 'Ext.data.Store',
    fields: ['id', 'codigo', 'nombre', 'apellidos', 'departamento', 'unidad_organizativa', 'departamento_id', 'unidad_organizativa_id'],
    groupField: 'unidad_organizativa',
    sorters: ['nombre','apellidos'],
    proxy : {
        url: '/nomenclador/trabajador/list',
        type : 'ajax'
    },
    autoLoad: true,
});