from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required
from nomenclador.models import Trabajador, Departamento, UnidadOrganizativa
import json


@login_required(login_url='/admin/login/')
def listar(request):
    data = []
    for trab in Trabajador.objects.all():
        data.append({
            'id': trab.id,
            'codigo': trab.codigo,
            'nombre': trab.nombre,
            'apellidos': trab.apellidos,
            'departamento': trab.departamento.nombre,
            'unidad_organizativa': trab.unidad_organizativa.nombre,
            'departamento_id': trab.departamento.id,
            'unidad_organizativa_id': trab.unidad_organizativa.id,
        })
    return JsonResponse(data, safe=False)


@login_required(login_url='/admin/login/')
def add(request):
    try:
        trab = Trabajador()
        trab.codigo = request.POST['codigo']
        trab.nombre = request.POST['nombre']
        trab.apellidos = request.POST['apellidos']
        trab.departamento = Departamento.objects.get(nombre=request.POST['departamento'])
        trab.unidad_organizativa = UnidadOrganizativa.objects.get(nombre=request.POST['unidad_organizativa'])
        trab.full_clean()
        trab.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@login_required(login_url='/admin/login/')
def edit(request):
    try:
        trab = Trabajador.objects.get(pk=request.POST['trabajador_id'])
        trab.codigo = request.POST['codigo']
        trab.nombre = request.POST['nombre']
        trab.apellidos = request.POST['apellidos']
        trab.departamento = Departamento.objects.get(nombre=request.POST['departamento'])
        trab.unidad_organizativa = UnidadOrganizativa.objects.get(nombre=request.POST['unidad_organizativa'])
        trab.validate_unique()
        trab.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@login_required(login_url='/admin/login/')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        Trabajador.objects.get(pk=pk).delete()
    return HttpResponse('')
