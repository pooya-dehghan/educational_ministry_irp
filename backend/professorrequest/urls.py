from django.urls import path, include

app_name = "professorrequest"


urlpatterns = [
    path('api/v1/', include('professorrequest.api.v1.urls', namespace='api-v1'))
]