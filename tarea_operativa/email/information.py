from tarea_operativa.email import semanal, quincenal, mensual, trimestral, anual, fecha_final, fecha_especifica
from django.core.exceptions import ObjectDoesNotExist
from tarea_operativa.models import PeriodoChequeo, Ejecutante
from datetime import date, timedelta


def get_tareas(users):
    # dic tareas_email
    tareas_email = []
    # get tomorrow day
    tomorrow = date.today() + timedelta(days=1)
    # if is saturday or sunday do not does anything
    if date.weekday(tomorrow) > 4:
        return tareas_email
    # get from user tareas by periodo_chequeo
    for user in users:
        tareas_ops = []
        for ejecutante in Ejecutante.objects.filter(user=user):
            tarea_op = ejecutante.tarea_operativa
            try:
                perio_ch = PeriodoChequeo.objects.get(tarea_operativa=tarea_op)
            except ObjectDoesNotExist:
                continue
            # Pasado de tiempo
            if tarea_op.fecha_ended <= tomorrow:
                nota_day = tomorrow - tarea_op.fecha_ended
                tareas_ops.append({
                    'inicio': tarea_op.fecha_start.strftime("%Y-%m-%d"),
                    'final': tarea_op.fecha_ended.strftime("%Y-%m-%d"),
                    'numero': tarea_op.get_numero(),
                    'descripcion': tarea_op.descripcion,
                    'nota': str(nota_day.days) + " días."
                })
            # periodo de chequeo diario
            elif perio_ch.periodo == 'Di':
                tareas_ops.append({
                    'inicio': tarea_op.fecha_start.strftime("%Y-%m-%d"),
                    'final': tarea_op.fecha_ended.strftime("%Y-%m-%d"),
                    'numero': tarea_op.get_numero(),
                    'descripcion': tarea_op.descripcion,
                    'nota': '-'
                })
            # periodo de chequeo semanal
            elif perio_ch.periodo == 'Se':
                tareas_ops = semanal.is_your_turn(tarea_op, perio_ch, tareas_ops)
            # periodo de chequeo quincenal
            elif perio_ch.periodo == 'Qu':
                tareas_ops = (quincenal.is_your_turn(tarea_op, perio_ch, tareas_ops))
            # periodo de chequeo mensual
            elif perio_ch.periodo == 'Me':
                tareas_ops = (mensual.is_your_turn(tarea_op, perio_ch, tareas_ops))
            # periodo de chequeo trimestral
            elif perio_ch.periodo == 'Tr':
                tareas_ops = (trimestral.is_your_turn(tarea_op, perio_ch, tareas_ops))
            # periodo de chequeo anual
            elif perio_ch.periodo == 'An':
                tareas_ops = (anual.is_your_turn(tarea_op, perio_ch, tareas_ops))
            # periodo de chequeo fecha-final
            elif perio_ch.periodo == 'FF':
                tareas_ops = (fecha_final.is_your_turn(tarea_op, tareas_ops))
            # periodo de chequeo fecha-especifica
            elif perio_ch.periodo == 'FE':
                tareas_ops = (fecha_especifica.is_your_turn(tarea_op, perio_ch, tareas_ops))
        # Save email with tarea
        if len(tareas_ops) > 0:
            tareas_email.append({
                'email': user.email,
                'tareas': tareas_ops
            })
    # return all tareas for user
    return tareas_email
