from django.http import HttpResponse, JsonResponse
from ..miscutils.sessions import BooksHelpers
from ..miscutils.sessions import BooksSessions


class BaseController:

    def __init__(self, controller_name, request, check_is_admin):

        self.controller_name = controller_name

        self._request = request

        self._http_response = HttpResponse
        self._json_response = JsonResponse

        self._check_is_admin = check_is_admin

        self._success = True
        self._error = None
        self._error_data = {}

        self._set_user_data()

    def _set_response_error(self, message='Произошла непредвиденная ошибка', error_data=None):
        self._success = False

        self._error = message

        if error_data is not None:
            self._error_data = error_data

    def _set_user_data(self):
        user_data = BooksSessions.check_if_authorized(self._request, return_user=True)

        self._user_data = user_data

        if user_data['user_error'] is True:
            self._set_response_error(None, None)

    def base_checks(self):
        base_checks = BooksHelpers.base_auth_checks_v2(self._user_data, self._check_is_admin)
        if base_checks is not None:
            error_message = base_checks.message if base_checks.message else None
            error_data = base_checks.data if base_checks.data else None
            self._set_response_error(error_message, error_data)

    def get_user_data(self, only_user=True):
        if only_user is True:
            return self._user_data['user']

        return self._user_data

    def response_to_client(self, json_data):

        # Если есть ошибка, возвращаем ее
        if self._success is False:
            return self._json_response({
                'success': False,
                'message': self._error,
                'data': self._error_data
            })

        # Если все хорошо, возвращаем данные
        return self._json_response(json_data)

    # Абстрактный метод
    def run(self):
        pass


# Декоратор для методов контроллера
def error_decorator(method):

    def wrapper(self):
        if (self._success is not False or self._error is None):
            return method(self)

    return wrapper
