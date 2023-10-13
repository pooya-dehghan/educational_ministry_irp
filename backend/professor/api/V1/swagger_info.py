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
        name='email',
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
        name='professor_id',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
]

swagger_parameters_update = [
    openapi.Parameter(
        name='username',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='email',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='national_code',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='phone_number',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='email',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='first_name',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='last_name',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='birthday_date',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='gender',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='avatar',
        in_=openapi.IN_PATH,
        description='Example path parameter',
        type=openapi.TYPE_STRING
    ),

]
