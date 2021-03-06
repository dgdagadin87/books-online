from django.views.decorators.csrf import csrf_exempt

from .include.controllers.gui.central import gui_central_controller
from .include.controllers.api.login import api_login_controller
from .include.controllers.api.logout import api_logout_controller
from .include.controllers.api.common import api_common_controller
from .include.controllers.api.allbooks import api_allbooks_controller
from .include.controllers.api.mybooks import api_mybooks_controller
from .include.controllers.api.users import api_users_controller
from .include.controllers.api.addtomybooks import api_addtomybooks_controller
from .include.controllers.api.deletemybook import api_deletemybook_controller
from .include.controllers.api.deletebook import api_deletebook_controller
from .include.controllers.api.downloadbook import api_downloadbook_controller
from .include.controllers.api.sendtomail import api_sendtomail_controller
from .include.controllers.api.adduser import api_adduser_controller
from .include.controllers.api.getuser import api_getuser_controller
from .include.controllers.api.edituser import api_edituser_controller
from .include.controllers.api.deleteuser import api_deleteuser_controller
from .include.controllers.api.addbook import api_addbook_controller
from .include.controllers.api.getrawbook import api_getrawbook_controller
from .include.controllers.api.downloadrawbook import api_downloadrawbook_controller
from .include.controllers.api.addrawbook import api_addrawbook_controller
from .include.controllers.api.getnotifyinfo import api_getnotifyinfo_controller
from .include.controllers.api.setnotifyread import api_setnotifyread_controller
from .include.controllers.api.clearnotify import api_clearnotify_controller
from .include.controllers.test.gettestbook import test_gettestbook_controller


def gui_central(request, url='', id=None):
    return gui_central_controller(request)


@csrf_exempt
def api_login(request):
    return api_login_controller(request)


@csrf_exempt
def api_logout(request):
    return api_logout_controller()


@csrf_exempt
def api_common(request):
    return api_common_controller(request)


@csrf_exempt
def api_allbooks(request):
    return api_allbooks_controller(request)


@csrf_exempt
def api_mybooks(request):
    return api_mybooks_controller(request)


@csrf_exempt
def api_users(request):
    return api_users_controller(request)


@csrf_exempt
def api_addtomybooks(request, id):
    return api_addtomybooks_controller(request, id)


@csrf_exempt
def api_adduser(request):
    return api_adduser_controller(request)


@csrf_exempt
def api_getuser(request, id):
    return api_getuser_controller(request, id)


@csrf_exempt
def api_edituser(request, id):
    return api_edituser_controller(request, id)


@csrf_exempt
def api_deleteuser(request, id):
    return api_deleteuser_controller(request, id)


@csrf_exempt
def api_deletemybook(request, id):
    return api_deletemybook_controller(request, id)


@csrf_exempt
def api_deletebook(request, id):
    return api_deletebook_controller(request, id)


@csrf_exempt
def api_downloadbook(request, id):
    return api_downloadbook_controller(request, id)


@csrf_exempt
def api_sendtomail(request, id):
    return api_sendtomail_controller(request, id)


@csrf_exempt
def api_addbook(request):
    return api_addbook_controller(request)


@csrf_exempt
def api_getrawbook(request):
    return api_getrawbook_controller(request)


@csrf_exempt
def api_addrawbook(request):
    return api_addrawbook_controller(request)


@csrf_exempt
def api_downloadrawbook(request, id):
    return api_downloadrawbook_controller(request, id)


@csrf_exempt
def api_getnotifyinfo(request):
    return api_getnotifyinfo_controller(request)


@csrf_exempt
def api_setnotifyread(request):
    return api_setnotifyread_controller(request)


@csrf_exempt
def api_clearnotify(request):
    return api_clearnotify_controller(request)


@csrf_exempt
def test_gettestbook(request):
    return test_gettestbook_controller(request)
