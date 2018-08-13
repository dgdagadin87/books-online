from booksapp.models import Books_2_users, Books
from ...abstract.base_controller2 import BaseController


def api_addtomybooks_controller(request, book_id):

    main_controller = AddToMyBooksController('addToMyBooks', request, True)
    return main_controller.run(book_id)


class AddToMyBooksController(BaseController):

    def run(self, book_id):

        self._error_message = 'Произошла непредвиденная ошибка (добавить мою книгу)'

        request = self._request

        # Базовые проверки
        self.base_checks()

        # Проверка, существует ли пользователь
        # Не нужно, т.к. выше это уже проверяется

        # Проверка, существует ли книга, которую собираемся добавлять
        try:
            book_to_add = Books.objects.get(book_id=book_id)
        except Books.DoesNotExist:
            return self.return_error(message='Выбранной книги не существует')
        except Exception:
            return self.return_error()

        book_to_add_id = int(book_to_add.book_id)

        # Проверка, существует ли кнмга в разделе "Мои книги"
        user_info = self.get_user_data(True)
        try:
            book_count = Books_2_users.objects.filter(book_id_id=book_to_add_id).filter(
                user_id_id=user_info.user_id).count()
            books_count = int(book_count)
        except Exception:
            return self.return_error()

        if books_count > 0:
            return self.return_error('Выбранная книга уже находится в разделе "Мои книги"')

        # Если все нормально, добавляем книгу
        book_for_adding = Books_2_users(book_id_id=book_to_add_id, user_id_id=user_info.user_id)
        try:
            book_for_adding.save()
        except Exception:
            return self.return_error()

        # Возврат, если все нормально
        return self.response_to_client()
