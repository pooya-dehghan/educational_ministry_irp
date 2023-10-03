from django.urls import path
from . import views
app_name = 'api-v1'


urlpatterns = [
    path('list/', views.ListRequest.as_view()),
    path('get/<int:id>/', views.GetRequest.as_view()),
    path('accept/<int:pk>/', views.AcceptRequest.as_view()),
    path('reject/<int:pk>/', views.RejectRequest.as_view()),
]
