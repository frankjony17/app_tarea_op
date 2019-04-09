from tarea_operativa.models import Ejecutante, EjecutanteAccion, PeriodoChequeo, Adjunto
from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from datetime import datetime
import json


# list all ejecutante from tarea_operativa
@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def listar(request):
    data = []
    ejecutantes_query = Ejecutante.objects.filter(
        user=request.user,  # Que sean del user auth
        estado=False,  # Que este pendiente
        tarea_operativa__publica=True  # Que sea publica
    )
    for ejecutante in ejecutantes_query:
        tarea = ejecutante.tarea_operativa
        # Build Numero to TareaOperativa
        if tarea.numero < 10:
            numero = str('TO-00') + str(tarea.numero) + '-' + str(datetime.now().year)
        else:
            numero = str('TO-') + str(tarea.numero) + '-' + str(datetime.now().year)
        # Estado real
        if tarea.fecha_ended == datetime.date(datetime.now()):
            estado_real = 2  # equals last day
        elif tarea.fecha_ended < datetime.date(datetime.now()):
            estado_real = 1  # grater dan last day old
        else:
            estado_real = 0  # in time
        data.append({
            'id': tarea.id,
            'fecha': tarea.fecha.strftime("%Y-%m-%d %H:%M:%S"),
            'numero': numero,
            'fecha_start': tarea.fecha_start,
            'fecha_ended': tarea.fecha_ended,
            'descripcion': tarea.descripcion,
            'categoria': tarea.categoria.nombre,
            'categoria_id': tarea.categoria.id,
            'periodo_chequeo': PeriodoChequeo.objects.get(tarea_operativa=tarea).periodo,
            'adjunto_length': Adjunto.objects.filter(tarea_operativa=tarea).count(),
            'estado_real': estado_real,
            'ejecutante_id': ejecutante.id
        })
    return JsonResponse(data, safe=False)


# list all acciones from tarea_operativa
@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def accion_list(request):
    data = []
    acciones = EjecutanteAccion.objects.filter(ejecutante_id=request.GET['ejecutante_id'])
    for accion in acciones:
        data.append({
            'id': accion.id,
            'fecha': accion.fecha.strftime("%Y-%m-%d %H:%M:%S"),
            'descripcion': accion.descripcion,
            'pronostico': accion.pronostico,
            'ejecutante_id': accion.ejecutante_id
        })
    return JsonResponse(data, safe=False)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def accion_add(request):
    try:
        json_data = json.loads(request.body.decode("utf-8"))

        accion_ej = EjecutanteAccion()
        accion_ej.fecha = json_data['fecha']
        accion_ej.descripcion = json_data['descripcion']
        accion_ej.pronostico = json_data['pronostico']
        accion_ej.ejecutante_id = json_data['ejecutante_id']
        accion_ej.validate_unique()
        accion_ej.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def accion_edit(request):
    try:
        json_data = json.loads(request.body.decode("utf-8"))
        accion_ej = EjecutanteAccion.objects.get(pk=json_data['id'])
        #
        if 'descripcion' in json_data:
            accion_ej.descripcion = json_data['descripcion']
        if 'pronostico' in json_data:
            accion_ej.pronostico = json_data['pronostico'][0:10]

        accion_ej.validate_unique()
        accion_ej.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def ejecutante_edit(request):
    try:
        ejecutante = Ejecutante.objects.get(pk=request.POST['id'])

        if 'estado' in request.POST:
            if request.POST['estado'] == 'true':
                ejecutante.estado = True
            else:
                ejecutante.estado = False
        if 'observacion' in request.POST:
            ejecutante.observacion = request.POST['observacion']
        ejecutante.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def accion_remove(request):
    json_data = json.loads(request.body.decode("utf-8"))
    EjecutanteAccion.objects.get(pk=json_data['id']).delete()

    return HttpResponse()
