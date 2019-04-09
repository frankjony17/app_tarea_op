from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required
from nomenclador.models import Departamento
import json


@login_required(login_url='/admin/login/')
def listar(request):
    data = []
    for de in Departamento.objects.all():
        data.append({
            'id': de.id,
            'codigo': de.codigo,
            'nombre': de.nombre
        })
    return JsonResponse(data, safe=False)


@login_required(login_url='/admin/login/')
def add(request):
    try:
        de = Departamento()
        de.codigo = request.POST['codigo']
        de.nombre = request.POST['nombre']
        de.validate_unique()
        de.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@login_required(login_url='/admin/login/')
def edit(request):
    try:
        de = Departamento.objects.get(pk=request.POST['id'])
        de.codigo = request.POST['codigo']
        de.nombre = request.POST['nombre']
        de.validate_unique()
        de.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@login_required(login_url='/admin/login/')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Departamento.objects.get(pk=pk).delete()
    return HttpResponse('')
