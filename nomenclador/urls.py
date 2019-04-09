from django.conf.urls import url
from nomenclador.views import unidad_organizativa, access_level, departamento, trabajador

urlpatterns = [
    # UO
    url(r'^unidad_organizativa/list', unidad_organizativa.listar),
    url(r'^unidad_organizativa/add', unidad_organizativa.add),
    url(r'^unidad_organizativa/edit', unidad_organizativa.edit),
    url(r'^unidad_organizativa/remove', unidad_organizativa.remove),
    # NA
    url(r'^access_level/list', access_level.listar),
    url(r'^access_level/add', access_level.add),
    url(r'^access_level/edit', access_level.edit),
    url(r'^access_level/remove', access_level.remove),
    # DEP
    url(r'^departamento/list', departamento.listar),
    url(r'^departamento/add', departamento.add),
    url(r'^departamento/edit', departamento.edit),
    url(r'^departamento/remove', departamento.remove),
    # TRA
    url(r'^trabajador/list', trabajador.listar),
    url(r'^trabajador/add', trabajador.add),
    url(r'^trabajador/edit', trabajador.edit),
    url(r'^trabajador/remove', trabajador.remove),
]
