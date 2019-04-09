from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import Permission
from django.utils.formats import date_format
from nomenclador.models import Trabajador
from django.db import IntegrityError
from security_admin.models import User
import json


@permission_required('security_admin.ADMIN_PERMISSION')
# Listado de todos los USUARIOS
def listar(request):
    data = []
    for user in User.objects.all():
        if user.access_level:
            nivel_acceso = user.access_level.nivel
        else:
            nivel_acceso = ''
        if user.last_login:
            last_login = date_format(user.last_login, "Y-m-d H:i")
        else:
            last_login = ''
        # Permission from User
        perm_by_user = ""
        permissions = user.user_permissions.filter(codename__contains='_PERMISSION')
        for perm in permissions:
            perm_by_user += perm.codename + ", "
        if user.is_superuser:
            perm_by_user += "SUPER-USER"
        data.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'last_login': last_login,
            'is_active': user.is_active,
            'access_level': nivel_acceso,
            'permission': perm_by_user.rstrip(", ")
        })
    return JsonResponse(data, safe=False)


@permission_required('security_admin.ADMIN_PERMISSION')
# Listado de TRABAJADORES que no son USUARIOS
def listar_trabajadores_no_usuarios(request):
    data = []
    trabajadores = Trabajador.objects.filter(
        user__trabajador_id__isnull=True
    )[int(request.GET['start']):(int(request.GET['page'])*10)]
    total = Trabajador.objects.filter(user__trabajador_id__isnull=True).count()

    for tr in trabajadores:
        apellido = tr.apellidos.split(' ')
        username = tr.nombre + '.' + apellido[0]
        data.append({
            'id': tr.id,
            'nombre': tr.nombre + ' ' + tr.apellidos,
            'username': username.lower(),
            'uo_id': tr.unidad_organizativa.id
        })
    return HttpResponse('{"total":"'+str(total)+'","data":'+str(json.dumps(data))+'}')


@permission_required('security_admin.ADMIN_PERMISSION')
# add new User from list of Trabajadores
def load_new_user(request):
    try:
        count = User.objects.all().count()
        for data in json.loads(request.POST['data']):
            count += 1
            User.objects.create_complete_user(
                data[1] + str(count),  # username
                Trabajador.objects.get(pk=data[0])  # Trabajador id
            ).save()
        return HttpResponse("OK")
    except IntegrityError as e:
        return HttpResponse(e)


@permission_required('security_admin.ADMIN_PERMISSION')
# edit User
def edit(request):
    try:
        user = User.objects.get(pk=request.POST['id'])
        user.username = request.POST['username']
        user.email = request.POST['email']
        user.validate_unique()
        user.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('security_admin.ADMIN_PERMISSION')
# active or inactive User
def active_inactive_user(request):
    user = User.objects.get(pk=request.POST['id'])
    user.is_active = not user.is_active
    user.save()
    return HttpResponse('')


@permission_required('security_admin.ADMIN_PERMISSION')
# active or inactive User
def permission_by_user(request):
    data = []
    user = User.objects.get(pk=request.GET['id'])
    permission = Permission.objects.filter(codename__contains='_PERMISSION')

    for perm in permission:
        have_perm = False
        for user_perm in user.user_permissions.all():
            if perm.codename == user_perm.codename:
                have_perm = True
                break
        data.append({
            'id': perm.id,
            'codename': perm.codename,
            'name': perm.name,
            'have_perm': have_perm
        })
    return JsonResponse(data, safe=False)


@permission_required('security_admin.ADMIN_PERMISSION')
# permission add for User
def permission_add(request):
    user = User.objects.get(pk=request.POST['user_id'])
    if request.POST['has_perm'] == 'true':
        user.user_permissions.add(Permission.objects.get(pk=request.POST['id']))
    else:
        user.user_permissions.remove(Permission.objects.get(pk=request.POST['id']))
    return HttpResponse('')


@permission_required('security_admin.ADMIN_PERMISSION')
# Access Level for user
def access_level(request):
    user = User.objects.get(pk=request.POST['id'])
    user.access_level_id = request.POST['accl_id']
    user.save()
    return HttpResponse('')


@permission_required('security_admin.ADMIN_PERMISSION')
# remove User
def remove(request):
    for pk in json.loads(request.POST['ids']):
        User.objects.get(pk=pk).delete()
    return HttpResponse('')
