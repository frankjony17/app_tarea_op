from tarea_operativa.models import TareaOperativa, Prorroga, PeriodoChequeo, Ejecutante, Categoria
from django.contrib.auth.decorators import permission_required
from django.core.serializers.json import DjangoJSONEncoder
from django.core.exceptions import ValidationError
from django.db.models import Max, Count, Q
from django.http import HttpResponse
from datetime import datetime
import json


# Tareas Generadas por el usuario
@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def listar(request):
    data = []
    tarea_operativa = TareaOperativa.objects.filter(user=request.user, estado=False).exclude(
        categoria__nombre='PAPELERA (TO)'
    ).annotate(
        total_adjuntos=Count('adjunto')
    )[int(request.GET['start']):(int(request.GET['page']) * 20)]

    if 'fecha_start' in request.GET and request.GET['fecha_start'] is not '':
        tarea_operativa = tarea_operativa.filter(fecha_start__gte=request.GET['fecha_start'])
    if 'fecha_ended' in request.GET and request.GET['fecha_ended'] is not '':
        tarea_operativa = tarea_operativa.filter(fecha_ended__lte=request.GET['fecha_ended'])
    
    total = TareaOperativa.objects.filter(user=request.user, estado=False).exclude(categoria__nombre='PAPELERA (TO)').count()
    # For
    for to in tarea_operativa:
        # Categoria
        if to.categoria:
            categoria = to.categoria.nombre
            categoria_id = to.categoria.id
        # Periodo
        periodo_name = '-'
        if PeriodoChequeo.objects.filter(tarea_operativa=to).exists():
            periodo_name = PeriodoChequeo.objects.get(tarea_operativa=to).periodo
        # Ejecutantes
        eje = Ejecutante.objects.filter(tarea_operativa=to)
        e_t = eje.count()
        e_c = eje.filter(estado=True).count()
        e_i = eje.filter(estado=False).count()
        data.append({
            'id': to.id,
            'fecha': to.fecha,
            'numero': to.get_numero(),
            'fecha_start': to.fecha_start,
            'fecha_ended': to.fecha_ended,
            'descripcion': to.descripcion,
            'publica': to.publica,
            'categoria': categoria,
            'categoria_id': categoria_id,
            'prorroga_length': Prorroga.objects.filter(tarea_operativa=to).count(),
            'periodo_chequeo': periodo_name,
            'ejecutante_length': e_t,
            'adjunto_length': to.total_adjuntos,
            'progress': e_c / e_t if e_c > 0 else 0,
            'e_c': e_c,
            'e_i': e_i
        })
    return HttpResponse('{"total":"'+str(total)+'","data":'+str(json.dumps(data, cls=DjangoJSONEncoder))+'}')


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def add(request):
    try:
        max_value = TareaOperativa.objects.all().aggregate(Max('numero'))

        if max_value['numero__max'] is not None:
            number = max_value['numero__max'] + 1
        else:
            number = 1

        to = TareaOperativa()
        to.fecha = datetime.now()
        to.numero = number
        to.fecha_start = request.POST['fecha_start']
        to.fecha_ended = request.POST['fecha_ended']
        to.descripcion = request.POST['descripcion']
        to.user = request.user

        if request.POST['categoria_id'] != 'CATEGORÍA':
            to.categoria = Categoria.objects.get(pk=request.POST['categoria_id'])
        else:
            to.categoria = Categoria.objects.get(nombre='TAREA OPERATIVA (TO)')

        to.validate_unique()
        to.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def publicar(request):
    try:
        to = TareaOperativa.objects.get(pk=request.POST['id'])

        if to.publica:
            return HttpResponse('La Tarea Operativa ya es <b>PUBLICA</b>!')

        to.publica = True
        to.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def archivar(request):
    try:
        pendiente = Count('ejecutante', filter=Q(ejecutante__estado=False))
        tarea_ope = TareaOperativa.objects.filter(id=request.POST['id']).annotate(pendiente=pendiente)
        #
        if tarea_ope[0].pendiente > 0:
            pen = str(tarea_ope[0].pendiente)
            if tarea_ope[0].numero < 10:
                numero = str('TO-00') + str(tarea_ope[0].numero) + '-' + str(datetime.now().year)
            else:
                numero = str('TO-') + str(tarea_ope[0].numero) + '-' + str(datetime.now().year)
            return HttpResponse('No se puede Archivar la Tarea: ' + numero + '<br><b>' + pen + ' Ejecutantes pendientes')

        to = TareaOperativa.objects.get(pk=request.POST['id'])
        to.estado = True
        to.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def edit(request):
    try:
        to = TareaOperativa.objects.get(pk=request.POST['pk'])

        to.fecha_start = request.POST['fecha_start']
        to.fecha_ended = request.POST['fecha_ended']
        to.descripcion = request.POST['descripcion']
        to.categoria = Categoria.objects.get(pk=request.POST['categoria_id'])

        to.validate_unique()
        to.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def remove(request):
    papelera = Categoria.objects.get(nombre='PAPELERA (TO)')
    tarea_op = TareaOperativa.objects.get(pk=request.POST['id'])

    tarea_op.categoria = papelera
    tarea_op.save()

    return HttpResponse()
