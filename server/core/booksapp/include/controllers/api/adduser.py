import re
from booksapp.models import Users
from ...abstract.base_controller2 import BaseController
from ...miscutils.helpers import BooksHelpers as helpers


def api_adduser_controller(request):

    main_controller = AddUserController('addUser', request, True)
    return main_controller.run()


class AddUserController(BaseController):

    def run(self):

        self._error_message = 'Произошла непредвиденная ошибка (добавить пользователя)'

        request = self._request

        # Базовые проверки
        self.base_checks()

        # Если метод не POST
        if request.method != 'POST':
            self._set_response_error(message=self._error_message)
            return self.response_to_client()

        # Получение данных с сервера
        post_data = request.POST
        user_login = str(post_data.get('userLogin'))
        user_name = str(post_data.get('userName'))
        user_is_admin = False if str(post_data.get('userIsAdmin')) == 'false' else True

        # Если имя/логин не заполнены
        if user_login == '' or user_name == '':
            return self._user_json_error('Заполните логин и/или имя')

        # Проверка логина на существование
        user_exists = False
        try:
            user_to_add = Users.objects.get(user_login=user_login)
            if user_to_add.user_login == user_login:
                user_exists = True
        except Users.DoesNotExist:
            pass
        except Exception:
            self._set_response_error(message=self._error_message)
            return self.response_to_client()

        if user_exists:
            return self._user_json_error('Пользователь с данным логином уже существует')

        # Если логин менее 5 либо более 100 символов или логин состоит не только из латиницы
        print(user_login)
        if self._check_login(user_login) is False:
            return self._user_json_error('Логин должен быть не менее 5 и не более 100 символов и состоять из латиницы')

        # Если имя пустое либо длиннее 100 символов
        if self._check_name(user_name) is False:
            return self._user_json_error('Имя пользователя должно быть непустым и не длиннее 100 символов')

        # Генерация секретного ключа
        secret_key = helpers.generate_secret_key()

        # Если все нормально, добавляем пользователя
        is_admin = 'yes' if user_is_admin else 'no'
        user_for_adding = Users(user_login=user_login, user_name=user_name, user_is_admin=is_admin, user_password=helpers.hash_string('Medved'), user_secret_key=str(secret_key))
        try:
            user_for_adding.save()
        except Exception:
            self._set_response_error(message=self._error_message)
            return self.response_to_client()

        # Возврат
        return self.response_to_client({
            'hasError': False,
            'errorText': None
        })

    def _user_json_error(self, error_text):
        return self.response_to_client({
            'hasError': True,
            'errorText': error_text
        })

    def _check_login(self, user_login):
        pattern = re.compile(r"^[a-z][a-z0-9]{4,99}$", re.I | re.S)
        findall_matches = pattern.findall(user_login)
        result = False if len(findall_matches) < 1 else True
        return result

    def _check_name(self, user_name):
        result = False if len(user_name) < 1 or len(user_name) > 100 else True
        return result
