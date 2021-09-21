from django.urls import path
from base.views import password_views as views

urlpatterns = [
    path('apppass/', views.AppPassView, name='AppPass'),
    path('passgroups/', views.PassGroupsView, name='Passgroups'),
    path('get/pass/<str:pk>', views.getPass, name='GetPass'),
    path('get/group/<str:pk>', views.getGroup, name='GetGroup'),
    path('create/pass/', views.createPass, name='CreatePass'),
    path('create/group/', views.createGroup, name='Creategroup')
]
