from tarea_operativa.models import Ejecutante, EjecutanteAccion, Adjunto
from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from security_admin.models import User
from datetime import datetime
import re


# list all ejecutante from tarea_operativa
@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def listar(request):
    try:
        data = []
        ejecutantes = Ejecutante.objects.filter(tarea_operativa_id=request.GET['id'])

        for ej in ejecutantes:
            accion_data = []
            ultima_entrada = '-'
            # if exist apply format
            if ej.ultima_entrada:
                ultima_entrada = ej.ultima_entrada.strftime("%Y-%m-%d %H:%M:%S")
            # action performed by ejecutante
            for accion in EjecutanteAccion.objects.filter(ejecutante_id=ej.id):
                accion_data.append({
                    'id': accion.id,
                    'fecha': accion.fecha.strftime("%Y-%m-%d %H:%M:%S"),
                    'descripcion': accion.descripcion,
                    'pronostico': accion.pronostico
                })
            data.append({
                'id': ej.id,
                'fecha': ej.fecha,
                'estado': ej.estado,
                'ejecutante': ej.user.trabajador.nombre + " " + ej.user.trabajador.apellidos,
                'observacion': ej.observacion,
                'requiere_adjunto': ej.requiere_adjunto,
                'acciones': accion_data,
                'ultima_entrada': ultima_entrada,
                'tarea_operativa_pk': ej.tarea_operativa_id
            })
        return JsonResponse(data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse([], safe=False)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def lis_user_by_level_access(request):
    data = []
    user = User.objects.filter(
        access_level__nivel__lte=request.user.access_level.nivel
    ).exclude(
        ejecutante__tarea_operativa_id=request.GET['tarea_operativa_pk']
    ).exclude(
        id=request.user.id
    )
    for u in user:
        de = ""
        rs = re.findall('[A-Z]', u.trabajador.departamento.nombre)
        for ch in rs:
            de += ch
        data.append({
            'id': u.id,
            'username': u.trabajador.nombre + " " + u.trabajador.apellidos,
            'departamento': de,
            'unidad_organizativa': u.trabajador.unidad_organizativa.acronimo
        })
    return JsonResponse(data, safe=False)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def add(request):
    try:
        ejecutante = Ejecutante()
        ejecutante.fecha = datetime.now()
        ejecutante.user_id = request.POST['user_pk']
        ejecutante.tarea_operativa_id = request.POST['tarea_operativa_pk']
        ejecutante.estado = False
        ejecutante.validate_unique()
        ejecutante.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def las_entry_edit(request):
    ejecutante = Ejecutante.objects.get(pk=request.GET['id'])
    ejecutante.ultima_entrada = datetime.now()
    # if exist apply format
    if ejecutante.ultima_entrada:
        ultima_entrada = ejecutante.ultima_entrada.strftime("%Y-%m-%d %H:%M:%S")
    else:
        ultima_entrada = '-'
    data = {
        'id': ejecutante.id,
        'fecha': ejecutante.fecha.strftime("%Y-%m-%d %H:%M:%S"),
        'observacion': ejecutante.observacion,
        'ultima_entrada': ultima_entrada,
        'requiere_adjunto': ejecutante.requiere_adjunto,
        'adjunto': Adjunto.objects.filter(ejecutante=ejecutante).count(),
        'estado': ejecutante.estado
    }
    ejecutante.save()
    return JsonResponse(data, safe=False)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def requiere_adjunto(request):
    try:
        ejecutante = Ejecutante.objects.get(pk=request.POST['id'])
        if request.POST['requiere_adjunto'] == 'true':
            ejecutante.requiere_adjunto = True
        else:
            ejecutante.requiere_adjunto = False
        ejecutante.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def remove(request):
    Ejecutante.objects.get(pk=request.POST['id']).delete()
    return HttpResponse('')
