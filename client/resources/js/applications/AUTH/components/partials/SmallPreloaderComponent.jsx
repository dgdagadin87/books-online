import React, {Component} from 'react';

import $ from 'jquery';

export default class PreLoaderComponent extends Component {

    componentWillReceiveProps() {}

    render() {

        let documentWidth = $(document).width();
        let leftPosition = parseInt(documentWidth)/2 - 100;

        return (
            <div className="main-preloader__small">
                <div className="preloader" style={{left:leftPosition+'px'}}>
                    <span className="image" />
                    <span className="text">Загрузка...</span>
                </div>
            </div>
        );
    }
}