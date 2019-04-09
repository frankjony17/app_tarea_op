from datetime import date, timedelta
from tarea_operativa.models import PeriodoChequeo


def is_your_turn(tarea_op, perio_ch, tareas_ops):
    # if tomorrow = periodo_chequeo day
    if weekday(perio_ch):
        tareas_ops.append({
            'inicio': tarea_op.fecha_start.strftime("%Y-%m-%d"),
            'final': tarea_op.fecha_ended.strftime("%Y-%m-%d"),
            'numero': tarea_op.get_numero(),
            'descripcion': tarea_op.descripcion,
            'nota': '-'
        })
    return tareas_ops


# get day of week
def weekday(perio_ch):
    # get tomorrow day
    tomorrow = date.today() + timedelta(days=1)
    # get weekday
    for day in perio_ch.dia_semana.split('|'):
        if day == 'Lu':  # Monday
            week_day = 0
        elif day == 'Ma':
            week_day = 1  # Tuesday
        elif day == 'Mi':
            week_day = 2  # Wednesday
        elif day == 'Ju':
            week_day = 3  # Thursday
        elif day == 'Vi':
            week_day = 4  # Friday
        elif day == 'Sa':
            week_day = 5  # Saturday
        else:
            week_day = 6  # Sunday
        # if tomorrow = weekday
        if week_day == date.weekday(tomorrow):
            # update ultimo_chequeo from PeriodoChequeo
            p_ch = PeriodoChequeo.objects.get(pk=perio_ch.id)
            p_ch.ultimo_chequeo = date.today()
            p_ch.save()
            return True
    return False
