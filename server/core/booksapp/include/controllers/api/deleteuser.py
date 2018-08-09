from booksapp.models import Users, Books_2_users
from django.db import IntegrityError, transaction
from ...abstract.base_controller2 import BaseController
from ...miscutils.sessions import BooksHelpers as helpers


def api_deleteuser_controller(request, user_id):

    main_controller = DeleteUserController('deleteUser', request, True)
    return main_controller.run(user_id)


class DeleteUserController(BaseController):

    def run(self, user_id):

        self._error_message = 'Произошла непредвиденная ошибка (удалить пользователя)'

        request = self._request

        # Базовые проверки
        self.base_checks()

        # Получение информации о пользователе
        try:
            user_info = Users.objects.get(user_id=user_id)
        except Users.DoesNotExist:
            return self.return_error()
        except Exception:
            return self.return_error()

        # Нельзя удалить себя
        auth_cookie = request.COOKIES.get('authCookie')
        parsed_cookie = helpers.json2object(auth_cookie)
        cookie_user_login = parsed_cookie.userName

        if user_info.user_login == cookie_user_login:
            return self.return_error('Нельзя удалить себя')

        # Удаление пользователя отовсюду
        try:
            with transaction.atomic():
                Books_2_users.objects.filter(user_id=int(user_id)).delete()
                Users.objects.filter(user_id=int(user_id)).delete()
        except IntegrityError:
            return self.return_error()

        # Возврат, если все нормально
        return self.response_to_client({})
