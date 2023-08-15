from drf_yasg import openapi


swagger_info = openapi.Info(
       title="Your API",
       default_version='v1',
       description="Your API description",
   )

swagger_parameters = [
       openapi.Parameter(
           name='name',
           in_=openapi.IN_PATH,
           description='Example PATH parameter',
           type=openapi.TYPE_STRING
       ),
       openapi.Parameter(
           name='slug',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_STRING
       ),
              openapi.Parameter(
           name='established_year',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_STRING
       ),
              openapi.Parameter(
           name='city',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_STRING
       ),
                     openapi.Parameter(
           name='region',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_INTEGER
       ),
                     openapi.Parameter(
           name='manager',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_STRING
       ),
                     openapi.Parameter(
           name='office_manager',
           in_=openapi.IN_PATH,
           description='Example path parameter',
           type=openapi.TYPE_OBJECT
       ),
]