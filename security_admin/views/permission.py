from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse
from django.contrib.auth.models import Permission, ContentType


@permission_required('security_admin.ADMIN_PERMISSION')
def listar(request):
    data = []
    permission = Permission.objects.filter(codename__contains='_PERMISSION')
    if not permission.exists():
        tarea_perm = Permission()
        tarea_perm.codename = 'TAREA_OPERATIVA_PERMISSION'
        tarea_perm.name = 'Acceso total al modulo de Tareas Operativas'
        tarea_perm.content_type = ContentType.objects.get(model='tareaoperativa')
        tarea_perm.save()

        admin_perm = Permission()
        admin_perm.codename = 'ADMIN_PERMISSION'
        admin_perm.name = 'Acceso total al modulo de Administración'
        admin_perm.content_type = ContentType.objects.get(app_label='security_admin')
        admin_perm.save()
    else:
        permission = Permission.objects.filter(codename__contains='_PERMISSION')
        for perm in permission:
            data.append({
                'id': perm.id,
                'codigo': perm.codename,
                'nombre': perm.name,
                'app_label': perm.content_type.app_label
            })
    return JsonResponse(data, safe=False)


