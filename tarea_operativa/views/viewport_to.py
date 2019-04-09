from django.shortcuts import render
from django.contrib.auth.decorators import permission_required


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def index(request):
    return render(request, 'tarea_operativa.html')
