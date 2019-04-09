from datetime import date, timedelta
from dateutil.relativedelta import relativedelta
from tarea_operativa.email import semanal


def is_your_turn(tarea_op, perio_ch, tareas_ops):
    # get tomorrow day
    tomorrow = date.today() + timedelta(days=1)
    # get three month
    if perio_ch.ultimo_chequeo is None:
        months = tarea_op.fecha_start + relativedelta(months=3)
    else:
        months = perio_ch.ultimo_chequeo + relativedelta(months=3)
    # if does more than one month
    if tomorrow >= months:
        if semanal.weekday(perio_ch):
            tareas_ops.append({
                'inicio': tarea_op.fecha_start.strftime("%Y-%m-%d"),
                'final': tarea_op.fecha_ended.strftime("%Y-%m-%d"),
                'numero': tarea_op.get_numero(),
                'descripcion': tarea_op.descripcion,
                'nota': '-'
            })
    return tareas_ops
