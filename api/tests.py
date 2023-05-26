# Create your tests here.
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
import json
from .models import Project, Project_Asset
from .serializers import ProjectSerializer

client = Client()

class GetAllProjectsTest(TestCase):

    def setUp(self):
        music_project = Project.objects.create(
            on_homepage=0,
            category_type=3,
            client_name='Client A',
            project_title='Music Project',
            project_order=1,
            project_type='Creative Production',
            description='Description for Music Project',
        )
        commercial_project = Project.objects.create(
            on_homepage=1,
            category_type=4,
            client_name='Client B',
            project_title='Commercial Project',
            project_order=2,
            project_type='Film Direction',
            description='Description for Commercial Project',
        )
        Project_Asset.objects.create(
            project=music_project,
            content_url='http://example.com/music.jpg',
            content_url_number=1,
            content_description='Music Project Photo',
            content_orientation=6,
            asset_order=None,
        )
        Project_Asset.objects.create(
            project=commercial_project,
            content_url='http://example.com/commercial.jpg',
            content_url_number=1,
            content_description='Commercial Project Photo',
            content_orientation=6,
            asset_order='1',
        )

    def test_get_all_projects(self):
        response = client.get(reverse('project-list'))

        projects = Project.objects.all()
        serialized_projects = ProjectSerializer(projects, many=True).data
        for project in serialized_projects:
            project_asset = Project_Asset.objects.filter(project_id=project['id'])
            project['assets'] = [{'url': asset.content_url, 'description': asset.content_description} for asset in project_asset]

        print(json.dumps(serialized_projects, indent=4)) # <-- add this line to print the formatted JSON object

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content), serialized_projects)
