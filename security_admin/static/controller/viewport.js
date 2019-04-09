
Ext.define('etecsa.controller.viewport', {
    extend: 'Ext.app.Controller',
    control: {
        'viewport-admin': {
            afterrender: "after_render_viewport",
            resize: "after_render_viewport"
        },
        '#admin-logout': {
            click: "logout"
        }
    },
    after_render_viewport: function (viewport) {
        var center = Ext.getCmp('center-region-id');
        center.setHeight(viewport.getHeight() - 85)
    },
    logout: function () {
        location.href = '/security_admin/logout';
    }
});


