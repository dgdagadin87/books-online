from booksapp.models import Users
from ...abstract.base_controller2 import BaseController


def api_getuser_controller(request, user_id):

    main_controller = GetUserController('getUser', request, True)
    return main_controller.run(user_id)


class GetUserController(BaseController):

    def run(self, user_id):

        self._error_message = 'Произошла непредвиденная ошибка (получить пользователя)'

        # Базовые проверки
        self.base_checks()

        # Получаем информацию по пользователю
        try:
            user_info = Users.objects.get(user_id=int(user_id))
        except Users.DoesNotExist:
            return self._user_json_error('Пользователь не найден в системе. Повторите попытку')
        except Exception:
            self._set_response_error(message=self._error_message)
            return self.response_to_client()

        # Информация по пользователю
        user_data = {
            'userId': user_info.user_id,
            'userLogin': user_info.user_login,
            'userName': user_info.user_name,
            'userIsAdmin': True if user_info.user_is_admin == 'yes' else False
        }

        # Возврат, если все нормально
        return self.response_to_client(user_data)

    def _user_json_error(self, error_text):
        return self.response_to_client({
            'hasError': True,
            'errorText': error_text
        })
