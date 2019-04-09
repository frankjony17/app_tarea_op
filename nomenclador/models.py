from django.db import models


class UnidadOrganizativa(models.Model):
    codigo = models.CharField(max_length=10, unique=True)
    nombre = models.CharField(max_length=80, unique=True)
    acronimo = models.CharField(max_length=15, unique=True)

    class Meta:
        db_table = 'nomenclador_unidad_organizativa'
        default_permissions = ()


class Departamento(models.Model):
    codigo = models.CharField(max_length=10, unique=True)
    nombre = models.CharField(max_length=80, unique=True)

    class Meta:
        default_permissions = ()


class Trabajador(models.Model):
    codigo = models.CharField(max_length=10, unique=True)
    nombre = models.CharField(max_length=32)
    apellidos = models.CharField(max_length=32)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    unidad_organizativa = models.ForeignKey(UnidadOrganizativa, on_delete=models.CASCADE)

    class Meta:
        default_permissions = ()


class NivelAcceso(models.Model):
    nivel = models.IntegerField(unique=True)
    descripcion = models.CharField(max_length=74)

    class Meta:
        db_table = "nomenclador_nivel_acceso"
        default_permissions = ()
