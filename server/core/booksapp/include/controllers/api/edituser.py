from booksapp.models import Users
from .adduser import AddUserController


def api_edituser_controller(request, user_id):

    main_controller = EditUserController('editUser', request, True)
    return main_controller.run(user_id)


class EditUserController(AddUserController):

    def run(self, user_id):

        self._error_message = 'Произошла непредвиденная ошибка (редактировать пользователя)'

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

            # Получаем информацию по пользователю
        try:
            user_info = Users.objects.get(user_id=int(user_id))
        except Users.DoesNotExist:
            return self._user_json_error('Пользователь не найден в системе. Повторите попытку')
        except Exception:
            self._set_response_error(message=self._error_message)
            return self.response_to_client()

        # Если логин менее 5 либо более 100 символов или логин состоит не только из латиницы
        if self._check_login(user_login) is False:
            return self._user_json_error('Логин должен быть не менее 5 и не более 100 символов и состоять из латиницы')

        # Если имя пустое либо длиннее 100 символов
        if self._check_name(user_name) is False:
            return self._user_json_error('Имя пользователя должно быть непустым и не длиннее 100 символов')

        # Если все нормально, добавляем пользователя
        is_admin = 'yes' if user_is_admin else 'no'
        user_for_editing = Users(user_id=user_id, user_login=user_login, user_name=user_name, user_is_admin=is_admin, user_password=user_info.user_password, user_secret_key=user_info.user_secret_key)
        try:
            user_for_editing.save()
        except Exception:
            self._set_response_error(message=self._error_message)
            return self.response_to_client()

        # Возврат, если все нормально
        return self.response_to_client({
            'hasError': False,
            'errorText': None
        })
