from django.urls import path
from .import views

urlpatterns = [
    path('',views.home, name='home'),
    path('cam',views.cam, name='cam'),
    path('demo',views.demo, name='demo'),
    path('resume',views.resume, name='resume'),
]