from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import test
from django.conf.urls.static import static
from django.conf import settings


schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls', namespace="accounts")),
    # path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('school/', include('school.urls', namespace="school")),
    path('student/', include('student.urls', namespace="student")),
    path('officemanager/', include('officemanager.urls', namespace='officemanager')),
    path('teacher/', include('teacher.urls', namespace='teacher')),
    path('professor/', include('professor.urls', namespace='professor')),
    path('notification/', include('notification.urls', namespace='notification')),
    path('request/', include('request.urls', namespace='request')),
    path('attendance/', include('attendance.urls', namespace='attendance')),
    path('task/', include('task.urls', namespace='task')),
    path('professorrequest/', include('professorrequest.urls')),
    path('test/', test, name="test")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
