from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import permission_required
from tarea_operativa.models import Categoria
import json


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def listar(request):
    data = []
    if Categoria.objects.filter(nombre__contains='(TO)').count() == 0:
        cat1 = Categoria()
        cat1.nombre = 'PAPELERA (TO)'
        cat1.descripcion = 'TAREAS ELIMINADAS. solo cambian de categoría pero se mantienen en la base de datos'
        cat2 = Categoria()
        cat2.nombre = 'TAREA OPERATIVA (TO)'
        cat2.descripcion = 'Categoría por defecto = TAREA OPERATIVA (TO)'
        cat1.save()
        cat2.save()

    for cat in Categoria.objects.filter(user=request.user):
        data.append({
            'id': cat.id,
            'nombre': cat.nombre,
            'descripcion': cat.descripcion
        })

    tarea_op = Categoria.objects.get(nombre='TAREA OPERATIVA (TO)')
    data.append({
        'id': tarea_op.id,
        'nombre': tarea_op.nombre,
        'descripcion': tarea_op.descripcion
    })
    return JsonResponse(data, safe=False)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def add(request):
    try:
        cat = Categoria()
        cat.nombre = request.POST['nombre']
        cat.descripcion = request.POST['descripcion']
        cat.user = request.user
        cat.validate_unique()
        cat.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def edit(request):
    try:
        cat = Categoria.objects.get(pk=request.POST['id'])

        if cat.nombre == 'TAREA OPERATIVA (TO)':
            return HttpResponse('Usted no tiene autorización para editar esta Tarea')

        cat.nombre = request.POST['nombre']
        cat.descripcion = request.POST['descripcion']
        cat.validate_unique()
        cat.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        categoria = Categoria.objects.get(pk=pk)
        if categoria.nombre == 'TAREA OPERATIVA (TO)':
            return HttpResponse('Usted no tiene autorización para eliminar esta Tarea!!!')
        categoria.delete()
    return HttpResponse('')
