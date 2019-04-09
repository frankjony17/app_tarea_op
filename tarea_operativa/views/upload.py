from django.contrib.auth.decorators import permission_required
from django.core.files.storage import default_storage
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ValidationError
from tarea_operativa.models import Adjunto
from django.conf import settings
from datetime import datetime
import urllib.parse
import mimetypes
import os


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def file_list(request):
    data = []
    files = []
    if 'ejecutante_pk' in request.GET:
        files = Adjunto.objects.filter(ejecutante_id=request.GET['ejecutante_pk'])
    if 'tarea_operativa_pk' in request.GET:
        files = Adjunto.objects.filter(tarea_operativa_id=request.GET['tarea_operativa_pk'])

    for file in files:
        if file.size >= 1000000:  # 1MB = 1000000 byte
            size = str(round(file.size / 1000000, 1)) + ' MB'
        else:  # 1 KB 1000 byte
            size = str(round(file.size / 1000, 1)) + ' KB'
        data.append({
            'id': file.id,
            'name': file.name,
            'extension': file.extension,
            'size': size,
            'descripcion': file.descripcion,
            'uploaded_at': file.uploaded_at.strftime("%Y-%m-%d %H:%M:%S"),
        })
    return JsonResponse(data, safe=False)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def upload_file(request):
    try:
        date = datetime.now()
        file = request.FILES['file']
        path = '_'.join((str(date.year), str(date.month), str(date.day), str(request.user.id), file.name))
        save_path = os.path.join(settings.MEDIA_ROOT, path)

        if file.size > int(settings.MAX_UPLOAD_SIZE):
            return HttpResponse('El tamaño del fichero: no esta permitido. <br><b>Máximo 5 MB</b>')

        name, extension = os.path.splitext(file.name)
        # Absolute path to Adjunto db table
        path = default_storage.save(save_path, file)
        strg = settings.MEDIA_ROOT.replace('\\', '/')
        path = path.replace(strg, '')
        path = path.replace('/', '')
        # Save in db
        adjunto = Adjunto()
        adjunto.name = name
        adjunto.extension = extension
        adjunto.size = file.size
        adjunto.path = path
        adjunto.descripcion = request.POST['descripcion']

        if request.POST['ejecutante_pk'] is not None:
            adjunto.ejecutante_id = request.POST['ejecutante_pk']
        if request.POST['tarea_operativa_pk'] is not None:
            adjunto.tarea_operativa_id = request.POST['tarea_operativa_pk']
        adjunto.save()
        return HttpResponse('ok')
    except ValidationError as e:
        return HttpResponse(e.messages)


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def download_file(request):
    adjunto = Adjunto.objects.get(pk=request.POST['id'])
    path = os.path.join(settings.MEDIA_ROOT, adjunto.path)
    file_name = adjunto.name + adjunto.extension

    response = HttpResponse(default_storage.open(path).read())

    content_type, encoding = mimetypes.guess_type(file_name)

    if content_type is None:
        content_type = 'application/octet-stream'

    response['Content-Type'] = content_type
    response['Content-Length'] = str(adjunto.size)

    if encoding is not None:
        response['Content-Encoding'] = encoding
    # For Firefox, we follow RFC2231 (encoding extension in HTTP headers).
    filename_header = 'filename*=UTF-8\'\'%s' % urllib.parse.quote(file_name.encode('utf-8'))
    response['Content-Disposition'] = 'attachment; ' + filename_header

    return response


@permission_required('tarea_operativa.TAREA_OPERATIVA_PERMISSION')
def file_remove(request):
    response = ''
    adjunto = Adjunto.objects.get(pk=request.POST['id'])
    path = os.path.join(settings.MEDIA_ROOT, adjunto.path)

    if default_storage.exists(path):
        default_storage.delete(path)
    else:
        response = 'El archivo no existe!'

    adjunto.delete()
    return HttpResponse(response)
