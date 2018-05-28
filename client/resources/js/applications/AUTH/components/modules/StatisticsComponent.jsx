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

class Statistics extends Component {

    componentDidMount () {

        const {changeTitle} = this.props;
        changeTitle('Статистика');
    }

    render() {

        return (
            <div>
                Статистика - можно посмотреть здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);