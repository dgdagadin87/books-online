import React from 'react';

class NoAccessComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (<div>У вас недостаточно прав для просмотра данной страницы.</div>);
    }
}

export default NoAccessComponent;