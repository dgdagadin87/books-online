import React, {Component} from 'react';

export default class PreloaderComponent extends Component {

    componentWillReceiveProps() {}

    render() {

        return (
            <div className="main-preloader__large">
                <div className="preloader">
                    <span className="image"/>
                    <span className="text">Загрузка...</span>
                </div>
            </div>
        );
    }
}