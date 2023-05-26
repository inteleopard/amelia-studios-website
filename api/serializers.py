from rest_framework import serializers
from .models import Project, Project_Asset

class ProjectAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_Asset
        fields = ('id', 'content_url', 'content_description')

class ProjectSerializer(serializers.ModelSerializer):
    assets = ProjectAssetSerializer(many=True)

    class Meta:
        model = Project
        fields = ('id', 'on_homepage', 'category_type', 'client_name', 'project_title', 'project_type', 'description', 'assets')
