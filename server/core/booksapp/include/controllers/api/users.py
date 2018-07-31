from django.http import JsonResponse
from booksapp.models import Users
from math import ceil


def api_users_controller(helpers, sessions, request):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response, True)
    if base_checks is not None:
        return base_checks

    # Объект ответа
    return_data = dict()

    # Получение объекта постраничной навигации
    pagination_data = api_users_get_pagination(request)
    if pagination_data is False:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    return_data['paging'] = pagination_data

    # Получение объекта фильтра
    filter_data = api_users_get_filter(request, pagination_data)
    return_data['filter'] = filter_data

    # Получение списка пользователей
    collection_data = api_users_get_collection(filter_data, pagination_data)
    if collection_data is False:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    return_data['collection'] = collection_data

    # Возврат
    return response({
        'data': return_data,
        'message': None,
        'isSuccess': True
    })


def api_users_get_filter(request, pagination):

    # Сортировка
    sort_type = request.GET.get('sortType')
    sort_field = request.GET.get('sortField')

    sort_type = 'ASC' if sort_type == 'ASC' else 'DESC'
    sort_fields = ['userLogin', 'userName']
    sort_field = sort_field if sort_field in sort_fields else 'userName'

    return {
        'sortField': sort_field,
        'sortType': sort_type,
        'page': pagination['page']
    }


def api_users_get_correct_sort_field(sort_field):

    sort_assocs = {
        'userLogin': 'user_login',
        'userName': 'user_name'
    }

    return sort_assocs[sort_field]


def api_users_get_pagination(request):

    page = request.GET.get('page')
    page = int(page)

    try:
        users_count = Users.objects.count()
        users_count = int(users_count)
    except Exception:
        return False

    num_of_pages = 1 if users_count < 1 else ceil(users_count/10)

    if page < 1:
        page = 1
    elif page > num_of_pages:
        page = num_of_pages

    return {
        'page': page,
        'pages': num_of_pages,
        'totalCount': users_count
    }


def api_users_get_collection(filter, pagination):

    page = pagination['page']

    users_list = []

    limit_value = 10*(page - 1)
    offset_value = 10*page

    sort_preffix = '' if filter['sortType'] == 'ASC' else '-'

    correct_sort_field = api_users_get_correct_sort_field(filter['sortField'])

    try:
        users_collection = Users.objects.filter().order_by(sort_preffix+correct_sort_field)[limit_value:offset_value]
    except Exception:
        return False

    for current_user in users_collection:

        users_list.append({
            'userId': current_user.user_id,
            'userLogin': current_user.user_login,
            'userName': current_user.user_name,
            'userIsAdmin': True if current_user.user_is_admin == 'yes' else False
        })

    return users_list
