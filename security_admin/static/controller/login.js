
Ext.define('etecsa.controller.login', {
    extend: 'Ext.app.Controller',
    control: {
        '#portal-login-btn-ok': {
            click: "validate"
        },
        '#login-textfield-usuario': {
            specialkey: "special_key_usuario"
        },
        '#login-textfield-password': {
            specialkey: "special_key_password"
        }
    },
    special_key_usuario: function (field, e) { var me = this;
        if (e.getKey() === e.ENTER) {
            var pass = Ext.getCmp('login-textfield-password');
            pass.focus(50, true);
        }
    },
    special_key_password: function (field, e) { var me = this;
        if (e.getKey() === e.ENTER) {
            me.validate(field);
        }
    },
    validate: function (btn) {
        var me = this, form = btn.up('form');

        me.disabled_button(form, true);

        if (form.getForm().isValid()) {
            me.login(form.getForm().getValues(), form);
        } else {
            me.disabled_button(form, false);
        }
    },
    disabled_button: function (form, bool) {
        form.down('[id=portal-login-btn-ok]').setDisabled(bool);
    },
    login: function (record, form) { var me = this;
        Ext.Ajax.request({
            url: '/security_admin/login/check/',
            params: {
                username: record['username'],
                password: record['password']
            },
            success: function(response) {
                switch(response.responseText) {
                    case 'adm':
                        location.href = '/security_admin';
                        break;
                    case 'top':
                        location.href = '/tarea_operativa';
                        break;
                    case 'logout':
                        location.href = '/security_admin/logout';
                        break;
                    default:
                        Me.msg.warning(response.responseText);
                        me.disabled_button(form, false);
                        break;
                }
            },
            failure: function(response) {
                Me.msg.error(response.responseText);
            }
        });
    }
});


