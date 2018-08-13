from booksapp.models import Books_2_users
from ...abstract.base_controller2 import BaseController


def api_deletemybook_controller(request, book_id):

    main_controller = DeleteMyBookController('deleteMyBook', request, False)
    return main_controller.run(book_id)


class DeleteMyBookController(BaseController):

    def run(self, book_id):

        self._error_message = 'Произошла непредвиденная ошибка (удалить мою книгу)'

        # Базовые проверки
        self.base_checks()

        # Пользователь
        user_info = self.get_user_data(True)

        # Если все нормально, удаляем книгу
        try:
            Books_2_users.objects.filter(book_id_id=int(book_id), user_id_id=user_info.user_id).delete()
        except Exception:
            return self.return_error()

        # Возврат, если все нормально
        return self.response_to_client()
