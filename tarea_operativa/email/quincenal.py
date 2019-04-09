from datetime import date, timedelta
from tarea_operativa.email import semanal


def is_your_turn(tarea_op, perio_ch, tareas_ops):
    # get tomorrow day
    tomorrow = date.today() + timedelta(days=1)
    # get fifteen day
    if perio_ch.ultimo_chequeo is None:
        day_fifteen = tarea_op.fecha_start + timedelta(days=15)
    else:
        day_fifteen = perio_ch.ultimo_chequeo + timedelta(days=15)
    # if does fifteen day
    if tomorrow >= day_fifteen:
        if semanal.weekday(perio_ch):
            tareas_ops.append({
                'inicio': tarea_op.fecha_start.strftime("%Y-%m-%d"),
                'final': tarea_op.fecha_ended.strftime("%Y-%m-%d"),
                'numero': tarea_op.get_numero(),
                'descripcion': tarea_op.descripcion,
                'nota': '-'
            })
    return tareas_ops
