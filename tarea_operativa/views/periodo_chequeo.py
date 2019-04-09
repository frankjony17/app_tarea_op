from django.contrib.auth.decorators import permission_required
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from tarea_operativa.models import PeriodoChequeo


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def listar(request):
    try:
        pech = PeriodoChequeo.objects.get(tarea_operativa_id=request.GET['id'])
        periodo_chequeo = {
            'Di': "DIARIO", 'Se': "SEMANAL", 'Qu': "QUINCENAL", 'Me': "MENSUAL",
            'Tr': "TRIMESTRAL", 'An': "ANUAL", 'FF': "FECHA-FINAL", 'FE': "FECHA-ESPECIFICA"
        }
        data = {
            'id': pech.id,
            'periodo': periodo_chequeo[pech.periodo],
            'dia_semana': pech.dia_semana,
            'fecha_especifica': pech.fecha_especifica,
            'tarea_operativa_pk': pech.tarea_operativa.id
        }
        return JsonResponse(data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse([], safe=False)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def add(request):
    try:
        pech = PeriodoChequeo()
        pech.periodo = request.POST['periodo']
        pech.tarea_operativa_id = request.POST['tarea_operativa_pk']

        if 'dia_semana' in request.POST:
            pech.dia_semana = request.POST['dia_semana']
        if 'fecha_especifica' in request.POST:
            pech.fecha_especifica = request.POST['fecha_especifica']

        pech.validate_unique()
        pech.save()
        return HttpResponse()
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def remove(request):
    PeriodoChequeo.objects.get(pk=request.POST['id']).delete()
    return HttpResponse('')
