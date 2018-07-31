from django.http import JsonResponse


def api_getnotifyinfo_controller(request):

    # Ответ
    response = JsonResponse


    # объект возврата
    return_object = {
        'data': {
            'notReadCount': 5,
            'notifications': [

            ]
        },
        'message': None,
        'success': True
    }

    # Возврат
    return response(return_object)
