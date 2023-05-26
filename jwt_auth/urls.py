from django.urls import path
from .views import RegisterView, LoginView # import view to use in register route

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view())
]