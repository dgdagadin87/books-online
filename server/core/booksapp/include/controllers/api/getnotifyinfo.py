from booksapp.models import Notifications
from ...abstract.base_controller2 import BaseController, error_decorator


def api_getnotifyinfo_controller(request):

    main_controller = GetNotifyInfoController('getNotifyInfo', request, True)
    return main_controller.run()


class GetNotifyInfoController(BaseController):

    def run(self):

        self._error_message = 'Произошла непредвиденная ошибка (уведомления)'
        self._only_return = False

        # Базовые проверки
        self.base_checks()

        # Объект возврата
        self._return_object = {
            'notReadCount': 0,
            'notifications': []
        }

        # Список нотификаций
        self._set_notifications_list()

        # Непрочитанные нотификации
        self._set_unread_notifications_number()

        # Возврат
        return self.response_to_client(self._return_object)

    @error_decorator
    def _set_notifications_list(self):

        user_data = self.get_user_data(True)
        user_id = user_data.user_id

        notifications_list = []

        try:
            collection = Notifications.objects.filter(user_id_id=user_id).order_by('-notification_id')[20]
        except Exception as e:
            print(e)
            self._set_response_error(message=self._error_message)
            return

        for current_notification in collection:

            notifications_list.append({
                'id': current_notification.book_id,
                'bookId': current_notification.book_id,
                'bookName': current_notification.book_name,
                'status': current_notification.status,
                'type': current_notification.type
            })

        if self._only_return:
            return notifications_list

        self._return_object['notifications'] = notifications_list

    @error_decorator
    def _set_unread_notifications_number(self):

        user_data = self.get_user_data(True)
        user_id = user_data.user_id

        try:
            unread_count = Notifications.objects.filter(user_id_id=user_id).filter(is_read='no').count()
            unread_count = int(unread_count)
        except Exception as e:
            print(e)
            return self._set_response_error(message=self._error_message)

        if unread_count > 20:
            unread_count = 20

        if self._only_return:
            return unread_count

        self._return_object['notReadCount'] = unread_count
