from django.contrib.auth.decorators import permission_required
from tarea_operativa.models import Prorroga, TareaOperativa
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from django.db.models import Max
from datetime import datetime


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def listar(request):
    data = []
    for pro in Prorroga.objects.filter(tarea_operativa_id=request.GET['id']).order_by('fecha'):
        data.append({
            'id': pro.id,
            'fecha': pro.fecha.strftime("%Y-%m-%d %H:%M:%S"),
            'fecha_ended_to': pro.fecha_ended_to,
            'prorroga': pro.prorroga,
            'motivo': pro.motivo,
            'tarea_operativa_pk': pro.tarea_operativa.id
        })
    return JsonResponse(data, safe=False)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def add(request):
    try:
        ta_operativa = TareaOperativa.objects.get(pk=request.POST['tarea_operativa_pk'])
        prorroga_max = Prorroga.objects.filter(tarea_operativa=ta_operativa).aggregate(Max('prorroga'))

        if prorroga_max['prorroga__max']:
            old_prorroga = prorroga_max['prorroga__max']
            str_prorroga = request.POST['prorroga'].split('-')
            new_prorroga = datetime(int(str_prorroga[0]), int(str_prorroga[1]), int(str_prorroga[2])).date()
            if new_prorroga <= old_prorroga:
                return HttpResponse('La Prorroga debe de se mayor que la anterior.')

        pro = Prorroga()
        pro.fecha = datetime.now()
        pro.fecha_ended_to = ta_operativa.fecha_ended
        pro.prorroga = request.POST['prorroga']
        pro.motivo = request.POST['motivo']
        pro.tarea_operativa = ta_operativa
        pro.validate_unique()
        pro.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def edit(request):
    try:
        prorroga_max = Prorroga.objects.filter(
            tarea_operativa_id=request.POST['tarea_operativa_pk']
        ).exclude(id=request.POST['id']).aggregate(Max('prorroga'))

        old_prorroga = prorroga_max['prorroga__max']
        str_prorroga = request.POST['prorroga'].split('-')
        new_prorroga = datetime(int(str_prorroga[0]), int(str_prorroga[1]), int(str_prorroga[2])).date()

        if new_prorroga <= old_prorroga:
            return HttpResponse('La Prorroga debe de se mayor que la anterior.')

        pro = Prorroga.objects.get(pk=request.POST['id'])
        pro.prorroga = request.POST['prorroga']
        pro.motivo = request.POST['motivo']
        pro.validate_unique()
        pro.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def remove(request):
    Prorroga.objects.get(pk=request.POST['id']).delete()
    return HttpResponse('')
