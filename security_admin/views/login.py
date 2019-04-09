from django.http import HttpResponseRedirect, HttpResponse
from ldap3.core.exceptions import LDAPSocketOpenError
from ldap3 import Server, Connection, ALL
from security_admin.models import User
from app_tarea_op import settings
from django.contrib import auth


def check(request):
    username = request.POST['username']
    password = request.POST['password']
    # define the server
    s = Server(settings.LDAP_HOST, get_info=ALL, port=389)
    try:
        # define the connection
        c = Connection(s, user=settings.LDAP_USER, password=settings.LDAP_PASS)
        # perform the Bind operation
        c.bind()
        c.search(settings.LDAP_SEARCH, '(&(objectclass=person)(uid=' + username + '))')
        # exist user!
        if c.response:
            # check password
            if c.rebind(c.response[0]['dn'], password):
                user = User.objects.get(username=username)
                user.set_password(password)
                user.save()
                # Correct password, and the user is marked "active"
                if user is not None and user.is_active:
                    auth.login(request, user)
                    # Redirect to a success page.
                    return HttpResponseRedirect("/security_admin/success")
        # close connection
        c.unbind()
    # no connection whit server. local authentication
    except LDAPSocketOpenError:
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            # Correct password, and the user is marked "active"
            auth.login(request, user)
            # Redirect to a success page.
            return HttpResponseRedirect("/security_admin/success")
    # who are you!!
    return HttpResponse('Credenciales Invalidas')


def success(request):
    if request.user.is_superuser or request.user.has_perm('security_admin.ADMIN_PERMISSION'):
        return HttpResponse("adm")
    elif request.user.has_perm('tarea_operativa.TAREA_OPERATIVA_PERMISSION'):
        return HttpResponse("top")
    else:
        return HttpResponse("logout")
