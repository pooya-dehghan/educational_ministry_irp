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
        name='username',
        in_=openapi.IN_PATH,
        description='Example path parameter',
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
swagger_parameters_update = [
    openapi.Parameter(
        name='title',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
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
        name='capacity',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_INTEGER
    ),
    openapi.Parameter(
        name='username',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_INTEGER
    ),
    openapi.Parameter(
        name='email',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_INTEGER
    ),
]
swagger_parameters_set_capacity = [
    openapi.Parameter(
        name='capacity',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_INTEGER
    ),
]
