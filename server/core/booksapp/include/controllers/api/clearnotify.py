import ast
from booksapp.models import Notifications
from ...abstract.base_controller2 import BaseController


def api_clearnotify_controller(request):

    main_controller = ClearNotifyController('clearNotify', request, True)
    return main_controller.run()


class ClearNotifyController(BaseController):

    def run(self):

        self._error_message = 'Произошла непредвиденная ошибка (уведомления)'

        # Базовые проверки
        self.base_checks()

        notifications = self._request.GET.get('ids')
        notifications = ast.literal_eval(notifications)

        if len(notifications) < 1:
            return self.response_to_client()

        user_data = self.get_user_data(True)
        user_id = user_data.user_id

        notifications_for_editing = Notifications.objects.filter(user_id_id=user_id).filter(notification_id__lte=max(notifications))
        try:
            notifications_for_editing.delete()
        except Exception as e:
            print (e)
            return self.return_error()

        # Возврат
        return self.response_to_client()
