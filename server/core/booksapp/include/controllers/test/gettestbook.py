import codecs
from ...abstract.base_controller import BaseController


def test_gettestbook_controller(request):

    main_controller = GetTestBookController('getTestBook', request, False)
    return main_controller.run()


class GetTestBookController(BaseController):

    def run(self):
        base_checks = self.base_checks()
        #if base_checks is not None:
        #    return self.response_to_client(base_checks)

        file = codecs.open('./booksapp/include/controllers/test/testbook.html', 'r', 'utf_8_sig')
        file_data = file.read()

        return self._http_response(file_data)