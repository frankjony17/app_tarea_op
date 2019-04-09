
Ext.define('etecsa.store.user', {
    extend: 'Ext.data.Store',
    fields: ['id', 'username', 'email', 'last_login', 'is_active', 'access_level', 'permission'],
    autoLoad: true,
    proxy : {
        url: '/security_admin/user/list',
        type : 'ajax'
    }
});