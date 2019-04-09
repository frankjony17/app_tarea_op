from django.db import models
from security_admin.models import User
from django.conf import settings


class Categoria(models.Model):
    nombre = models.CharField(max_length=32, unique=True)
    descripcion = models.CharField(max_length=120, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        default_permissions = ()


class TareaOperativa(models.Model):
    fecha = models.DateTimeField()
    numero = models.IntegerField()
    fecha_start = models.DateField()
    fecha_ended = models.DateField()
    descripcion = models.TextField()
    estado = models.BooleanField(default=False)
    publica = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)

    def get_numero(self):
        import datetime
        if self.numero < 10:
            numero = str('TO-00') + str(self.numero) + '-' + str(datetime.datetime.now().year)
        elif self.numero < 100:
            numero = str('TO-0') + str(self.numero) + '-' + str(datetime.datetime.now().year)
        else:
            numero = str('TO-') + str(self.numero) + '-' + str(datetime.datetime.now().year)
        return numero

    class Meta:
        default_permissions = ()
        db_table = "tarea_operativa"


class Ejecutante(models.Model):
    fecha = models.DateField()
    observacion = models.CharField(max_length=102, null=True)
    estado = models.BooleanField(default=False)
    ultima_entrada = models.DateTimeField(null=True)
    requiere_adjunto = models.BooleanField(default=False)
    tarea_operativa = models.ForeignKey(TareaOperativa, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'tarea_operativa')
        default_permissions = ()


class EjecutanteAccion(models.Model):
    fecha = models.DateTimeField()
    descripcion = models.CharField(max_length=256)
    pronostico = models.DateField(null=True)
    ejecutante = models.ForeignKey(Ejecutante, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()
        db_table = "tarea_operativa_ejecutante_accion"


class PeriodoChequeo(models.Model):
    periodo = models.CharField(max_length=24)
    dia_semana = models.CharField(max_length=20, null=True)
    fecha_especifica = models.CharField(max_length=153, null=True)
    tarea_operativa = models.OneToOneField(TareaOperativa, on_delete=models.CASCADE)
    ultimo_chequeo = models.DateField(null=True)

    class Meta:
        default_permissions = ()
        db_table = "tarea_operativa_periodo_chequeo"


class Prorroga(models.Model):
    fecha = models.DateTimeField()
    fecha_ended_to = models.DateField()  # fecha_ended from Tareaoperativa
    prorroga = models.DateField()
    motivo = models.CharField(max_length=120)
    tarea_operativa = models.ForeignKey(TareaOperativa, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()


class Adjunto(models.Model):
    name = models.CharField(max_length=108)
    extension = models.CharField(max_length=7)
    size = models.FloatField()
    path = models.CharField(max_length=140)
    descripcion = models.CharField(max_length=120, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    ejecutante = models.ForeignKey(Ejecutante, on_delete=models.CASCADE, null=True)
    tarea_operativa = models.ForeignKey(TareaOperativa, on_delete=models.CASCADE, null=True)

    class Meta:
        default_permissions = ()
