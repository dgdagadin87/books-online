import React, {Component} from 'react';

export default class FooterComponent extends Component {

    componentWillReceiveProps(props) {
    }

    render() {

        let footerCurYear = new Date().getFullYear();

        return (
            <div className="main-footer">
                <div className="under-footer">
                    <div className="left-one">
                        <div>
                            <a target="_blank" href="https://github.com/dgdagadin87/books-online/">Репозиторий</a> проекта
                        </div>
                    </div>
                    <div className="center-one">
                        Версия <strong>0.0.0</strong> &copy;
                    </div>
                    <div className="right-one">
                        <div>
                            {footerCurYear} год
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}