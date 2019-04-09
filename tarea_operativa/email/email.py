from email.mime.multipart import MIMEMultipart
from smtplib import SMTP, SMTPException
from email.mime.text import MIMEText
from django.http import HttpResponse
from app_tarea_op import settings


def send_email(to, html):
    try:
        # Create message container - the correct MIME type is multipart/alternative.
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Recordatorio Tareas-Operativas!!!"
        msg['From'] = settings.EMAIL_USER
        msg['To'] = to
        # Create the body of the message (a plain-text and an HTML version).
        text = html
        # Record the MIME types of both parts - text/plain and text/html.
        part1 = MIMEText(text, 'plain')
        part2 = MIMEText(html, 'html')
        # Attach parts into message container.
        # According to RFC 2046, the last part of a multipart message, in this case
        # the HTML message, is best and preferred.
        msg.attach(part1)
        msg.attach(part2)

        server = SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        server.sendmail(settings.EMAIL_USER, to, msg.as_string())
        server.quit()
    except SMTPException as e:
        return HttpResponse(e)
