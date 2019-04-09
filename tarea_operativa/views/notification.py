from tarea_operativa.email import information
from tarea_operativa.email import email
from security_admin.models import User
from django.http import HttpResponse
from django.template import loader


# send email from tarea_operativa
def notify(request):

    users = User.objects.filter(ejecutante__tarea_operativa__estado=False, ejecutante__estado=False).distinct()

    for info in information.get_tareas(users):
        html_template = loader.get_template('email_on_time.html')
        html = html_template.render({'tareas': info['tareas']})

        email.send_email(info['email'], html)

    return HttpResponse('email send success...')


