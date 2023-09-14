from django.urls import path
from . import views

app_name = "api-v1"

urlpatterns = [
    path('list/', views.OfficeManagerList.as_view()),
    path('create/', views.OfficeManagerCreate.as_view()),
    path('update/<int:pk>/', views.OfficeManagerUpdate.as_view()),
    path('delete/<int:pk>/', views.OfficeManagerDelete.as_view()),
    path('get/<int:pk>/', views.OfficeManagerGet.as_view()),
    path('schoollist/', views.SchoolList.as_view()),
    path('schoolget/<int:pk>/', views.SchoolGet.as_view()),
    path('seenrequest/<int:pk>/', views.SeenRequest.as_view()),
    path('requests/list/', views.ListRequest.as_view(), name="requests-list"),
    path('requests/list/<int:id>/', views.GetRequest.as_view(), name="request-get"),
    path('rejectrequest/<int:pk>/', views.RejectRequest.as_view()),
    path('acceptrequest/<int:school_id>/<int:notification_id>/', views.AcceptRequest.as_view()),
    path('requests/list/<int:id>/', views.GetRequest.as_view(), name="request-get"),
    path('requests/list/unseen/', views.UnSeenRequest.as_view()),
    path('requests/list/pending/', views.PendingRequest.as_view()),
]
