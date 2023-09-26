from drf_yasg import openapi

swagger_info = openapi.Info(
    title="Your API",
    default_version='v1',
    description="Your API description",
)

swagger_parameters_register = [
    openapi.Parameter(
        name='username',
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

swagger_parameters_login = [
    openapi.Parameter(
        name='username',
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
]
swagger_parameters_forgot = [
    openapi.Parameter(
        name='email',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
]
swagger_parameters_reset = [
    openapi.Parameter(
        name='new_password',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='new_password_confirm',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
]
swagger_parameters_change = [
    openapi.Parameter(
        name='username',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='old_password',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='new_password',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='new_password_confirm',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
]

swagger_parameters_avatar = [
    openapi.Parameter(
        name='avatar',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_FILE
    ),
]
