import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = () => {
    return {};
};

class Notifications extends Component {

    render() {

        return (
            <div>
                Уведомления - можно посмотреть здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps)(Notifications);