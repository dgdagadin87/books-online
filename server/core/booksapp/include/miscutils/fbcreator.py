import xml.etree.ElementTree as xml


class FbCreator(object):

    def create_fb2(self, config):

        self._config = config

        self._add_root_element()
        self._add_description_element()
        self._add_body_element()

        return xml.tostring(self._root, encoding='UTF-8', method='xml')

    def _add_root_element(self):

        self._root = xml.Element('FictionBook')
        self._root.attrib['xmlns'] = 'http://www.gribuser.ru/xml/fictionbook/2.0'
        self._root.attrib['xmlns:l'] = 'http://www.w3.org/1999/xlink'

    def _add_description_element(self):

        description = xml.SubElement(self._root, 'description')
        title_info = xml.SubElement(description, 'title-info')

        genre = xml.SubElement(title_info, 'genre')
        genre.text = self._config['genre']

        author = xml.SubElement(title_info, 'author')
        first_name = xml.SubElement(author, 'first-name')
        first_name.text = self._config['author']
        xml.SubElement(author, 'last-name')
        identifier = xml.SubElement(author, 'id')
        identifier.text = self._config['authorId']

        book_title = xml.SubElement(title_info, 'book-title')
        book_title.text = self._config['bookTitle']

        annotation = xml.SubElement(title_info, 'annotation')
        annotation_content = xml.SubElement(annotation, 'p')
        annotation_content.text = self._config['annotation']

        date = xml.SubElement(title_info, 'date')
        date.attrib['value'] = '2004-01-01'
        date.text = '2004'

        lang = xml.SubElement(title_info, 'lang')
        lang.text = 'ru'

        sequence = xml.SubElement(title_info, 'sequence')
        sequence.attrib['name'] = '_SEQUENCE'
        sequence.attrib['number'] = '777'

        xml.SubElement(description, 'document-info')

        publish_info = xml.SubElement(description, 'publish-info')

        xml.SubElement(publish_info, 'book-name')
        xml.SubElement(publish_info, 'publisher')
        xml.SubElement(publish_info, 'city')
        xml.SubElement(publish_info, 'year')
        xml.SubElement(publish_info, 'isbn')
        xml.SubElement(publish_info, 'sequence')

    def _add_body_element(self):

        body = xml.SubElement(self._root, 'body')

        title = xml.SubElement(body, 'title')
        title_content = xml.SubElement(title, 'p')
        title_content.text = self._config['bookTitle']

        for section in self._config['content']:
            self._add_section_to_body(body, section)

    def _add_section_to_body(self, body_element, section_data):

        section = xml.SubElement(body_element, 'section')
        section_title = xml.SubElement(section, 'title')
        section_title_content = xml.SubElement(section_title, 'p')
        section_title_content.text = section_data['title']

        for item in section_data['content']:
            section_content = xml.SubElement(section, 'p')
            section_content.text = item
