from django.http import JsonResponse
from booksapp.models import Users
from math import ceil
from ...abstract.base_controller2 import BaseController, error_decorator


def api_users_controller(request):

    main_controller = UsersController('users', request, True)
    return main_controller.run()


class UsersController(BaseController):

    def run(self):

        self._error_message = 'Произошла непредвиденная ошибка (пользователи)'

        # Базовые проверки
        self.base_checks()

        # Объект возврата
        self._return_object = {}

        # Пагинация
        self._set_paging()

        # Фильтр
        self._set_filter()

        # Список
        self._set_collection()

        # Возврат
        return self.response_to_client(self._return_object)

    @error_decorator
    def _set_filter(self):

        request = self._request

        if self._return_object['paging'] is None:
            return

        pagination = self._return_object['paging']

        sort_type = request.GET.get('sortType')
        sort_field = request.GET.get('sortField')

        sort_type = 'ASC' if sort_type == 'ASC' else 'DESC'
        sort_fields = ['userLogin', 'userName']
        sort_field = sort_field if sort_field in sort_fields else 'userName'

        self._return_object['filter'] = {
            'sortField': sort_field,
            'sortType': sort_type,
            'page': pagination['page']
        }

    @error_decorator
    def _set_paging(self):

        request = self._request

        page = request.GET.get('page')
        if page is None:
            page = 1
        page = int(page)

        try:
            users_count = Users.objects.count()
            users_count = int(users_count)
        except Exception:
            self._set_response_error(message=self._error_message)
            return

        num_of_pages = 1 if users_count < 1 else ceil(users_count / 10)

        if page < 1:
            page = 1
        elif page > num_of_pages:
            page = num_of_pages

        self._return_object['paging'] = {
            'page': page,
            'pages': num_of_pages,
            'totalCount': users_count
        }

    @error_decorator
    def _set_collection(self):

        if self._return_object['paging'] is None or self._return_object['filter'] is None:
            return

        pagination = self._return_object['paging']
        filter = self._return_object['filter']

        page = pagination['page']

        users_list = []

        limit_value = 10 * (page - 1)
        offset_value = 10 * page

        sort_preffix = '' if filter['sortType'] == 'ASC' else '-'

        correct_sort_field = self._get_correct_sort_field(filter['sortField'])

        try:
            users_collection = Users.objects.filter().order_by(sort_preffix + correct_sort_field)[limit_value:offset_value]
        except Exception:
            self._set_response_error(message=self._error_message)
            return

        for current_user in users_collection:
            users_list.append({
                'userId': current_user.user_id,
                'userLogin': current_user.user_login,
                'userName': current_user.user_name,
                'userIsAdmin': True if current_user.user_is_admin == 'yes' else False
            })

        self._return_object['collection'] = users_list

    def _get_correct_sort_field(self, sort_field):
        sort_assocs = {
            'userLogin': 'user_login',
            'userName': 'user_name'
        }
        return sort_assocs[sort_field]
