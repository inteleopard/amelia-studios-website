from django.contrib import admin
from .models import Project, Project_Asset

admin.site.register(Project_Asset)
admin.site.register(Project)