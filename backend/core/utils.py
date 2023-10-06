from http import HTTPStatus
from rest_framework import exceptions
from rest_framework.views import Response, exception_handler


def api_exception_handler(exception: Exception, context: dict) -> Response:
    """Custom API exception handler."""
    print("***************************************************************")
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exception, context)

    # Only alter the response when it's a validation error
    if not isinstance(exception, exceptions.ValidationError):
        return response
    print("***************************************************************")
    # It's a validation error, there should be a Serializer
    view = context.get("view", None)
    serializer = view.get_serializer_class()()

    errors_list = []
    for key, details in response.data.items():

        if key in serializer.fields:
            label = serializer.fields[key].label
            help_text = serializer.fields[key].help_text

            for message in details:
                errors_list.append("{}: {}".format(label, message))

        elif key == "non_field_errors":
            for message in details:
                errors_list.append(message)

        else:
            for message in details:
                errors_list.append("{}: {}".format(key, message))

    # Using the description's of the HTTPStatus class as error message.
    http_code_to_message = {v.value: v.description for v in HTTPStatus}
    print("***************************************************************")
    error_payload = {
        "status_code": 0,
        "type": "ValidationError",
        "message": "",
        "errors": [],
    }
    print("***************************************************************")
    #  error = error_payload["error"]
    status_code = response.status_code

    error_payload["status_code"] = status_code
    error_payload["message"] = http_code_to_message[status_code]
    error_payload["errors"] = errors_list

    # Overwrite default exception_handler response data
    response.data = error_payload
    print("***************************************************************")
    return response
