from django.http import JsonResponse
from .serializers import ProjectSerializer
from .models import Project, Project_Asset

# GET REQUEST: View all projects & associated project assets 
def project_list(request):
    projects = Project.objects.all()
    serialized_projects = ProjectSerializer(projects, many=True).data
    for project in serialized_projects:
        project_asset = Project_Asset.objects.filter(project_id=project['id'])
        project['assets'] = [{'url': asset.content_url, 'description': asset.content_description} for asset in project_asset]
    return JsonResponse(serialized_projects, safe=False)
