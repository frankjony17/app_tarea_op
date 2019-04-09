from django.conf.urls import url
from django.urls import reverse_lazy
from security_admin.views import login
from django.contrib.auth import views as auth_views
from security_admin.views import viewport, user, permission


urlpatterns = [
    url(r'^$', viewport.index, name='index'),
    # LOGIN
    url(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    url(r'^login/check/$', login.check),
    url(r'^logout/$', auth_views.logout, {'next_page': reverse_lazy('login')}, name='logout'),
    url(r'^success/$', login.success),
    # ADMIN
    url(r'^permisos/list', permission.listar),
    url(r'^user/list', user.listar),
    url(r'^user/trabajadores_no_usuarios', user.listar_trabajadores_no_usuarios),
    url(r'^user/load_new_user', user.load_new_user),
    url(r'^user/edit', user.edit),
    url(r'^user/remove', user.remove),
    url(r'^user/active_inactive_user', user.active_inactive_user),
    url(r'^user/permission_by_user', user.permission_by_user),
    url(r'^user/permission_add', user.permission_add),
    url(r'^user/access_level', user.access_level),
]
