from drf_yasg import openapi

swagger_info = openapi.Info(
    title="Your API",
    default_version='v1',
    description="Your API description",
)

swagger_parameters = [
    openapi.Parameter(
        name='date',
        in_=openapi.IN_PATH,
        description='Example PATH parameter',
        type=openapi.TYPE_STRING
    ),

]
