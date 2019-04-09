from datetime import date, timedelta
from dateutil.relativedelta import relativedelta
from tarea_operativa.email import semanal


def is_your_turn(tarea_op, tareas_ops):
    # get tomorrow day
    tomorrow = date.today() + timedelta(days=1)
    # if does more than tarea_op.fecha_ended
    if tomorrow >= tarea_op.fecha_ended:
        tareas_ops.append({
            'inicio': tarea_op.fecha_start.strftime("%Y-%m-%d"),
            'final': tarea_op.fecha_ended.strftime("%Y-%m-%d"),
            'numero': tarea_op.get_numero(),
            'descripcion': tarea_op.descripcion,
            'nota': '-'
        })
    return tareas_ops
