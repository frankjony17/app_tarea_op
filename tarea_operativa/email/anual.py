from datetime import date, timedelta
from dateutil.relativedelta import relativedelta
from tarea_operativa.email import semanal


def is_your_turn(tarea_op, perio_ch, tareas_ops):
    # get tomorrow day
    tomorrow = date.today() + timedelta(days=1)
    # get one year
    if perio_ch.ultimo_chequeo is None:
        year = tarea_op.fecha_start + relativedelta(years=1)
    else:
        year = perio_ch.ultimo_chequeo + relativedelta(years=1)
    # if does more than one year
    if tomorrow >= year:
        if semanal.weekday(perio_ch):
            tareas_ops.append({
                'inicio': tarea_op.fecha_start.strftime("%Y-%m-%d"),
                'final': tarea_op.fecha_ended.strftime("%Y-%m-%d"),
                'numero': tarea_op.get_numero(),
                'descripcion': tarea_op.descripcion,
                'nota': '-'
            })
    return tareas_ops
