from drf_yasg import openapi


swagger_parameters_register = [
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
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='password_confirmation',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='studentUniqueCode',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
]
