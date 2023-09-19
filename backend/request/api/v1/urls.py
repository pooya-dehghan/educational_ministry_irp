from django.urls import path
from . import views
app_name = 'api-v1'


urlpatterns = [
    path('list/', views.ListRequest.as_view(), name="requests-list"),
    path('get/<int:id>/', views.GetRequest.as_view(), name="request-get"),
    path('reject/<int:pk>/', views.RejectRequest.as_view()),
    path('accept/<int:school_id>/<int:request_id>/', views.AcceptRequest.as_view()),
]