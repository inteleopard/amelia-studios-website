from django.urls import path
from .views import project_list
# from django.conf import settings
# from django.conf.urls.static import static


urlpatterns = [
    path('projects/', project_list, name='project-list'),
]
# ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
