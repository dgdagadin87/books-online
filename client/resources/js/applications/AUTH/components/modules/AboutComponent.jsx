import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeTitle} from '../../actions/common';

const mapStateToProps = () => {
    return {};
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        changeTitle: changeTitle
    }, dispatch);
}

class About extends Component {

    componentDidMount () {

        const {changeTitle} = this.props;
        changeTitle('О программе');
    }

    render() {

        return (
            <div className="main-about__panel">
                <div className="main-about__title">
                    Описание
                </div>
                <div className="main-about__content">
                    <div className="paragraph">
                        Данное программное программное обеспечение полностью написано мною, <a style={{color:'#2b80cf'}} href="mailto:dgdagadin@gmail.com">dgdagadin@gmail.com</a>, от проектировки до разворачивания на хостинге. Суть данного программного обеспечения &mdash; предоставление возможности скачивания электронных книг в формате ".fb2" с определенных сайтов, где книги доступны для чтения онлайн, но недоступны для скачивания. Данное ПО полностью некоммерческое.
                    </div>
                </div>
                <div className="main-about__title" style={{marginTop:'15px'}}>
                    Поддержка браузеров
                </div>
                <div className="main-about__content">
                    <div className="paragraph">
                        Данное программное программное стабильно работает в следующих браузерах:
                        <ul>
                            <li>IE 9+</li>
                            <li>Google Chrome (все версии)</li>
                            <li>Opera (все версии)</li>
                            <li>Mozilla Firefox (Все версии)</li>
                        </ul>
                        <div style={{paddingTop:'5px'}}>В остальных (кроме IE 8 и менее) с большой долей вероятности также заработает</div>
                    </div>
                </div>
                <div className="main-about__title" style={{marginTop:'15px'}}>
                    Список технологий
                </div>
                <div className="main-about__content">
                    <div className="paragraph">
                        Программное обеспечение построено по принципу SPA (single-page application - одностраничное web-приложение). При разработке был использовал следующий стэк технологий:
                        <ul className="tech-list">
                            <li>
                                Клиентская часть:
                                <a target="_blank" href={'https://reactjs.org/'}>React JS 16.2.0</a>,
                                <a target="_blank" href={'https://www.npmjs.com/package/react-router'}>React Router 4.2.0</a>,
                                <a target="_blank" href={'https://jquery.com/'}>JQuery 3.2.1</a>,
                                <a target="_blank" href={'https://jqueryui.com/'}>JQuery UI 1.12.1</a>,
                                <a target="_blank" href={'http://underscorejs.org/'}>Underscore 1.8.3</a>
                            </li>
                            <li style={{paddingTop:'5px'}}>
                                Серверная часть:
                                <a target="_blank" href={'https://www.python.org/'}>Python 3.6.4</a>,
                                <a target="_blank" href={'https://github.com/django/django'}>Django 2.0.2</a>,
                                <a target="_blank" href={'https://dev.mysql.com/'}>MySQL Community Server 5.7.21</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="main-about__title" style={{marginTop:'15px'}}>
                    Контактная информация
                </div>
                <div className="main-about__content">
                    <div className="paragraph">
                        Репозиторий проекта - <a style={{color:'#2b80cf'}} target="_blank" href="https://github.com/dgdagadin87/books-online">https://github.com/dgdagadin87/books-online</a>, &nbsp; автор проекта - <a style={{color:'#2b80cf'}} href="mailto:dgdagadin@gmail.com">dgdagadin@gmail.com</a>.
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);