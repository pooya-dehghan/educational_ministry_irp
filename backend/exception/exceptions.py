from django.shortcuts import render

# Create your views here.


from rest_framework.exceptions import APIException


class NotFoundCustomException(APIException):
    status_code = 404
    default_detail = 'مورد درخواست یافت نشد.'
    default_code = 'not_found'


class PermissionDeniedCustomException(APIException):
    status_code = 403
    default_detail = 'شما اجازه دسترسی به این منبع را ندارید.'
    default_code = 'permission_denied'


class NotFoundCustomException(APIException):
    status_code = 404
    default_detail = 'مورد درخواست یافت نشد.'
    default_code = 'not_found'


class BadRequestCustomException(APIException):
    status_code = 400
    default_detail = 'درخواست نامعتبر.'
    default_code = 'bad_request'


class PermissionDeniedCustomException(APIException):
    status_code = 403
    default_detail = 'شما اجازه دسترسی به این منبع را ندارید.'
    default_code = 'permission_denied'


class ServerErrorCustomException(APIException):
    status_code = 500
    default_detail = 'خطای سرور رخ داده است.'
    default_code = 'server_error'