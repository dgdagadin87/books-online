from .helpers import BooksHelpers
from booksapp.models import Users


class BooksSessions(object):

    @staticmethod
    def check_if_authorized(request, return_user=False):

        # Получаем авторизационую куку
        auth_cookie = request.COOKIES.get('authCookie')

        # Если ее вообще нет
        if auth_cookie is None:
            return {
                'user_error': False,
                'error_type': None,
                'user': False
            }

        # Переводим из json в объект
        parsed_cookie = BooksHelpers.json2object(auth_cookie)
        cookie_user_name = parsed_cookie.userName
        cookie_secret_key = parsed_cookie.secretKey

        # Если нет ее элементов
        if cookie_user_name is None or cookie_secret_key is None:
            return {
                'user_error': False,
                'error_type': None,
                'user': False
            }

        # Проверяем секретный ключ на корректность
        try:
            user = Users.objects.get(user_login=cookie_user_name, user_secret_key=cookie_secret_key)
        except Exception:
            return {
                'user_error': True,
                'error_type': 'dbError',
                'user': False
            }

        return_dict = {
            'user_error': False,
            'error_type': None,
            'user': None
        }

        # Если все нормально
        if return_user is False:
            return_dict['user'] = True
        else:
            return_dict['user'] = user

        return return_dict
