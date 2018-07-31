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
        self._user_data = BooksSessions.check_if_authorized(self._request, return_user=True)

    def response_to_client(self, json_data):
        return self._json_response(json_data)

    def base_checks(self):
        base_checks = BooksHelpers.base_auth_checks_v2(self._user_data, self._check_is_admin)
        if base_checks is not None:
            return self._json_response(base_checks)

    def standart_error(self, message=None):
        return self.response_to_client({
            'success': False,
            'message': 'Произошла непредвиденная ошибка' if message is None else message
        })

    # Типа абстрактный метод
    def run(self):
        pass
