from datetime import date, timedelta


def is_your_turn(tarea_op, perio_ch, tareas_ops):
    # if tomorrow = periodo_chequeo day
    if specifies_date(perio_ch):
        tareas_ops.append({
            'inicio': tarea_op.fecha_start.strftime("%Y-%m-%d"),
            'final': tarea_op.fecha_ended.strftime("%Y-%m-%d"),
            'numero': tarea_op.get_numero(),
            'descripcion': tarea_op.descripcion,
            'nota': '-'
        })
    return tareas_ops


# get day of week
def specifies_date(perio_ch):
    # get tomorrow day
    tomorrow = date.today() + timedelta(days=1)
    # get specifies date
    for me_date in perio_ch.fecha_especifica.split('|'):
        if me_date:
            year, month, day = (int(x) for x in me_date.split('-'))
            specifies_day = date(year, month, day)
            # if tomorrow = specifies date
            if specifies_day == tomorrow:
                return True
    return False
