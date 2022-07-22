from django.urls import path
from .import views

urlpatterns=[
    path('', views.home, name='home'),
    path('pay', views.pay, name='pay'),
    path('success', views.success, name='success'),
    path('error', views.error, name='error'),
    path('about', views.about, name='about')
]