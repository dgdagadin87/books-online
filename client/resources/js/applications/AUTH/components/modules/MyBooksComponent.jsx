import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { changeTitle } from '../../actions/common';

const mapStateToProps = (state) => {
    return {
        userData: state.commonData.userData
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        changeTitle: changeTitle
    }, dispatch);
}

class Books extends Component {

    componentDidMount () {

        const {changeTitle} = this.props;
        changeTitle('Книги');
    }

    render() {

        return (
            <div className="main-addnewbook__container">
                Книги - можно выбрать здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);