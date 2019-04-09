from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required
from nomenclador.models import NivelAcceso
import json


@login_required(login_url='/admin/login/')
def listar(request):
    data = []
    for na in NivelAcceso.objects.all():
        data.append({
            'id': na.id,
            'nivel': na.nivel,
            'descripcion': na.descripcion
        })
    return JsonResponse(data, safe=False)


@login_required(login_url='/admin/login/')
def add(request):
    try:
        na = NivelAcceso()
        na.nivel = request.POST['nivel']
        na.descripcion = request.POST['descripcion']
        na.validate_unique()
        na.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@login_required(login_url='/admin/login/')
def edit(request):
    try:
        na = NivelAcceso.objects.get(pk=request.POST['id'])
        na.nivel = request.POST['nivel']
        na.descripcion = request.POST['descripcion']
        na.validate_unique()
        na.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@login_required(login_url='/admin/login/')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        NivelAcceso.objects.get(pk=pk).delete()
    return HttpResponse('')
