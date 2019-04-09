from django.conf.urls import url
from tarea_operativa.views import viewport_to, categoria, tarea_operativa, prorroga, notification
from tarea_operativa.views import periodo_chequeo, ejecutante, upload, tarea_op_ejecutante
urlpatterns = [
    url(r'^$', viewport_to.index, name='index'),
    # Categoria
    url(r'^categoria/list', categoria.listar),
    url(r'^categoria/add', categoria.add),
    url(r'^categoria/edit', categoria.edit),
    url(r'^categoria/remove', categoria.remove),
    # Tarea Operativa
    # Generate
    url(r'^to/generadas_list', tarea_operativa.listar),
    url(r'^to/generadas_add', tarea_operativa.add),
    url(r'^to/generadas_edit', tarea_operativa.edit),
    url(r'^to/generadas_publicar', tarea_operativa.publicar),
    url(r'^to/generadas_archivar', tarea_operativa.archivar),
    url(r'^to/generadas_remove', tarea_operativa.remove),
    # Prorroga
    url(r'^to/prorroga/list', prorroga.listar),
    url(r'^to/prorroga/add', prorroga.add),
    url(r'^to/prorroga/edit', prorroga.edit),
    url(r'^to/prorroga/remove', prorroga.remove),
    # Periodo Chequeo
    url(r'^to/periodo_chequeo/list', periodo_chequeo.listar),
    url(r'^to/periodo_chequeo/add', periodo_chequeo.add),
    url(r'^to/periodo_chequeo/remove', periodo_chequeo.remove),
    # Ejecutante
    url(r'^to/ejecutante/list', ejecutante.listar),
    url(r'^to/ejecutante/lis_user', ejecutante.lis_user_by_level_access),
    url(r'^to/ejecutante/requiere_adjunto', ejecutante.requiere_adjunto),
    url(r'^to/ejecutante/add', ejecutante.add),
    url(r'^to/ejecutante/ultima_entrada_edit', ejecutante.las_entry_edit),
    url(r'^to/ejecutante/remove', ejecutante.remove),
    # upload Adjunto
    url(r'^to/upload/file_list', upload.file_list),
    url(r'^to/upload/file_up', upload.upload_file),
    url(r'^to/upload/file_down', upload.download_file),
    url(r'^to/upload/file_remove', upload.file_remove),
    # tarea op ejecutante
    url(r'^to/asignadas_list', tarea_op_ejecutante.listar),
    url(r'^to/ejecutante_accion/accion_list', tarea_op_ejecutante.accion_list),
    url(r'^to/ejecutante_accion/accion_add', tarea_op_ejecutante.accion_add),
    url(r'^to/ejecutante_accion/accion_edit', tarea_op_ejecutante.accion_edit),
    url(r'^to/ejecutante_accion/accion_remove', tarea_op_ejecutante.accion_remove),
    url(r'^to/ejecutante_accion/ejecutante_edit', tarea_op_ejecutante.ejecutante_edit),
    # email
    url(r'^to/email/notification', notification.notify)
]

