from django.urls import path, include
from django.conf.urls import url
from tarea_operativa.views import viewport_to

urlpatterns = [
    path('security_admin/', include('security_admin.urls')),
    path('nomenclador/', include('nomenclador.urls')),
    path('tarea_operativa/', include('tarea_operativa.urls')),
    # Tarea Operativa
    url(r'^$', viewport_to.index, name='index'),
]
