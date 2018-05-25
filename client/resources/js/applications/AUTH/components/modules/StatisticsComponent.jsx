import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = () => {
    return {};
};

class Statistics extends Component {

    render() {

        return (
            <div>
                Статистика - можно посмотреть здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps)(Statistics);