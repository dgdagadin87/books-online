from .getnotifyinfo import GetNotifyInfoController


def api_common_controller(request):

    main_controller = CommonController('common', request, False)
    return main_controller.run()


class CommonController(GetNotifyInfoController):

    def run(self):

        self._error_message = 'Произошла непредвиденная ошибка (общее)'
        self._only_return = True

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
            'notifications': self._get_notifications_object(),
            'title': self._get_title()
        }

        # Возврат
        return self.response_to_client(return_object)

    def _get_notifications_object(self):
        return {
            'notReadCount': self._set_unread_notifications_number(),
            'notifications': self._set_notifications_list()
        }

    def _get_title(self):
        return 'Приложение "Книги" - начало'
