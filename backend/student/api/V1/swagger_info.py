from drf_yasg import openapi


swagger_info = openapi.Info(
       title="Your API",
       default_version='v1',
       description="Your API description",
   )

swagger_parameters = [
       openapi.Parameter(
           name='username',
           in_=openapi.IN_PATH,
           description='Example PATH parameter',
           type=openapi.TYPE_STRING
       ),
       openapi.Parameter(
           name='password',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_STRING
       ),
              openapi.Parameter(
           name='password_confirmation',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_STRING
       ),
              openapi.Parameter(
           name='student_id',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_STRING
       ),
]