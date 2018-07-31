import hashlib
import json
from collections import namedtuple
from datetime import datetime
from decimal import Decimal


class BooksHelpers(object):

    @staticmethod
    def get_author_id():
        return '0123456789'

    @staticmethod
    def get_annotation(book_name, book_author, book_genre):
        book_annotation = 'Название книги - "' + str(book_name) + '", автор книги - ' + str(book_author) + ', жанр - ' + str(book_genre) + '. '
        book_annotation += 'Данный файл был создан приложением "Книги". Приятного прочтения!'
        return book_annotation

    @staticmethod
    def json2object(data):
        return json.loads(data, object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))

    @staticmethod
    def hash_string(string_to_hash):
        correct_string = str(string_to_hash)
        encoded_string = correct_string.encode('utf-8')
        hashed_object = hashlib.sha1(encoded_string)
        return hashed_object.hexdigest()

    @staticmethod
    def base_auth_checks(user_data, response, admin_check=False):
        # Если ошибка в БД
        user_error = user_data['user_error']
        if user_error is True:
            return response({
                'success': False,
                'message': 'Произошла непредвиденная ошибка'
            })

        # Если не авторизованы
        user_info = user_data['user']
        if user_info is False:
            return response({
                'success': False,
                'message': 'Неизвестная ошибка',
                'data': {
                    'errorCode': 'NOT_AUTH'
                }
            })

        # Если пользователь не админ
        if admin_check:
            if user_info.user_is_admin != 'yes':
                return response({
                    'success': False,
                    'message': 'Неизвестная ошибка',
                    'data': {
                        'errorCode': 'ACCESS_DENIED'
                    }
                })

        # Если все ок
        return None

    @staticmethod
    def base_auth_checks_v2(user_data, admin_check=False):
        # Если ошибка в БД
        user_error = user_data['user_error']
        if user_error is True:
            return {
                'success': False,
                'message': 'Произошла непредвиденная ошибка'
            }

        # Если не авторизованы
        user_info = user_data['user']
        if user_info is False:
            return {
                'success': False,
                'message': 'Неизвестная ошибка',
                'data': {
                    'errorCode': 'NOT_AUTH'
                }
            }

        # Если пользователь не админ
        if admin_check:
            if user_info.user_is_admin != 'yes':
                return {
                    'success': False,
                    'message': 'Неизвестная ошибка',
                    'data': {
                        'errorCode': 'ACCESS_DENIED'
                    }
                }

        # Если все ок
        return None

    @staticmethod
    def generate_secret_key():
        time_date = datetime.utcnow() - datetime(1970, 1, 1)
        timestamp_microseconds = (time_date.days * 86400 + time_date.seconds) * 10 ** 6 + time_date.microseconds
        return Decimal(timestamp_microseconds).scaleb(-6)

    @staticmethod
    def get_correct_genre(genre_code):
        genres = {
            'detectivi': 'Дедективы',
            'fantastika': 'Фантастика',
            'romani': 'Романы'
        }

        if genre_code in genres:
            return genres[genre_code]

        genre = str(genre_code).replace('-', ' ')
        return genre[0].upper() + genre[1:]

    @staticmethod
    def translate(name):

        name = name.replace(' ', '-').lower()

        transtable = (
            ## Большие буквы
            (u"Щ", u"Sch"),
            (u"Щ", u"SCH"),
            # two-symbol
            (u"Ё", u"Yo"),
            (u"Ё", u"YO"),
            (u"Ж", u"Zh"),
            (u"Ж", u"ZH"),
            (u"Ц", u"Ts"),
            (u"Ц", u"TS"),
            (u"Ч", u"Ch"),
            (u"Ч", u"CH"),
            (u"Ш", u"Sh"),
            (u"Ш", u"SH"),
            (u"Ы", u"Yi"),
            (u"Ы", u"YI"),
            (u"Ю", u"Yu"),
            (u"Ю", u"YU"),
            (u"Я", u"Ya"),
            (u"Я", u"YA"),
            # one-symbol
            (u"А", u"A"),
            (u"Б", u"B"),
            (u"В", u"V"),
            (u"Г", u"G"),
            (u"Д", u"D"),
            (u"Е", u"E"),
            (u"З", u"Z"),
            (u"И", u"I"),
            (u"Й", u"J"),
            (u"К", u"K"),
            (u"Л", u"L"),
            (u"М", u"M"),
            (u"Н", u"N"),
            (u"О", u"O"),
            (u"П", u"P"),
            (u"Р", u"R"),
            (u"С", u"S"),
            (u"Т", u"T"),
            (u"У", u"U"),
            (u"Ф", u"F"),
            (u"Х", u"H"),
            (u"Э", u"E"),
            (u"Ъ", u"`"),
            (u"Ь", u"'"),
            ## Маленькие буквы
            # three-symbols
            (u"щ", u"sch"),
            # two-symbols
            (u"ё", u"yo"),
            (u"ж", u"zh"),
            (u"ц", u"ts"),
            (u"ч", u"ch"),
            (u"ш", u"sh"),
            (u"ы", u"yi"),
            (u"ю", u"yu"),
            (u"я", u"ya"),
            # one-symbol
            (u"а", u"a"),
            (u"б", u"b"),
            (u"в", u"v"),
            (u"г", u"g"),
            (u"д", u"d"),
            (u"е", u"e"),
            (u"з", u"z"),
            (u"и", u"i"),
            (u"й", u"j"),
            (u"к", u"k"),
            (u"л", u"l"),
            (u"м", u"m"),
            (u"н", u"n"),
            (u"о", u"o"),
            (u"п", u"p"),
            (u"р", u"r"),
            (u"с", u"s"),
            (u"т", u"t"),
            (u"у", u"u"),
            (u"ф", u"f"),
            (u"х", u"h"),
            (u"э", u"e"),
        )
        # перебираем символы в таблице и заменяем
        for symbol_in, symbol_out in transtable:
            name = name.replace(symbol_in, symbol_out)
        # возвращаем переменную
        return name
