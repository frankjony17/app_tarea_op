from django.shortcuts import render
from django.contrib.auth.decorators import permission_required


@permission_required('security_admin.ADMIN_PERMISSION')
def index(request):
    return render(request, 'index.html')
