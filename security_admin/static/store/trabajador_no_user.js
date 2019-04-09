
Ext.define('etecsa.store.trabajador_no_user', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre', 'username', 'uo_id'],
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: 'ajax',
        url: '/security_admin/user/trabajadores_no_usuarios',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});