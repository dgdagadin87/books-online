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

class Notifications extends Component {

    componentDidMount () {

        const {changeTitle} = this.props;
        changeTitle('Уведомления');
    }

    render() {

        return (
            <div className="main-about__container">
                Уведомления - полное описание здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);