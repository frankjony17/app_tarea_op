from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required
from nomenclador.models import UnidadOrganizativa
import json


@login_required(login_url='/admin/login/')
def listar(request):
    data = []
    for uo in UnidadOrganizativa.objects.all():
        data.append({
            'id': uo.id,
            'codigo': uo.codigo,
            'nombre': uo.nombre,
            'acronimo': uo.acronimo
        })
    return JsonResponse(data, safe=False)


@login_required(login_url='/admin/login/')
def add(request):
    try:
        uo = UnidadOrganizativa()
        uo.codigo = request.POST['codigo']
        uo.nombre = request.POST['nombre']
        uo.acronimo = request.POST['acronimo']
        uo.validate_unique()
        uo.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@login_required(login_url='/admin/login/')
def edit(request):
    try:
        uo = UnidadOrganizativa.objects.get(pk=request.POST['id'])
        uo.codigo = request.POST['codigo']
        uo.nombre = request.POST['nombre']
        uo.acronimo = request.POST['acronimo']
        uo.validate_unique()
        uo.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@login_required(login_url='/admin/login/')
def remove(request):
    for pk in json.loads(request.POST['ids']):
        UnidadOrganizativa.objects.get(pk=pk).delete()
    return HttpResponse('')
