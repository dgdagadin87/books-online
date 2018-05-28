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

class Profile extends Component {

    componentDidMount () {

        const {changeTitle} = this.props;
        changeTitle('Профиль');
    }

    render() {

        return (
            <div>
                Профиль - можно отредактировать здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);