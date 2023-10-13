from drf_yasg import openapi

swagger_parameters_task = [
    openapi.Parameter(
        name='title',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
    openapi.Parameter(
        name='description',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
        openapi.Parameter(
        name='deadline',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),
]

swagger_parameters_upload_task = [
    openapi.Parameter(
        name='file',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_FILE
    ),
]