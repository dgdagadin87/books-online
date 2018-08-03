from ...abstract.base_controller2 import BaseController


def api_common_controller(request):

    main_controller = CommonController('common', request, False)
    return main_controller.run()


class CommonController(BaseController):

    def run(self):

        # Базовые проверки
        self.base_checks()

        # Объект пользователя
        user_info = self.get_user_data()

        # Объект возврата
        user_is_admin = True if user_info.user_is_admin == 'yes' else False
        return_object = {
            'user': {
                'userId': user_info.user_id,
                'userLogin': user_info.user_login,
                'userName': user_info.user_name,
                'userIsAdmin': user_is_admin
            },
            'notifications': self._get_notifications(),
            'title': self._get_title()
        }

        # Возврат
        return self.response_to_client(return_object)

    def _get_notifications(self):
        return {
            'notReadCount': 1,
            'notifications': [
                {
                    'id': 1,
                    'status': 'success',
                    'bookId': 11,
                    'bookName': 'Синий мопс счастья',
                    'type': 'add'
                }
            ]
        }

    def _get_title(self):
        return 'Приложение "Книги" - начало'
