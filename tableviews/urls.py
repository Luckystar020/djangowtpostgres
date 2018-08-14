from django.urls import path

from tableviews.controller import pr,po

urlpatterns = [
    path('', pr.index, name='index'),
    path('about/', po.about, name='about'),
]
