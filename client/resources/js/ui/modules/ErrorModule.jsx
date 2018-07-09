import React, {Component} from 'react';
import {connect} from 'react-redux';

import ModalComponent from '../components/ModalComponent';
import {bindActionCreators} from 'redux';
import actions from '../../config/actions';

const mapStateToProps = (state) => {
    return {
        errors: state.commonData.errors
    };
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        clearErrors: () => ({
            type: actions.COMMON_CLEAR_GLOBAL_ERRORS,
            payload: null
        })
    }, dispatch);
}

class ErrorModalWindow extends Component {

    _clearClickHandler() {

        const {clearErrors} = this.props;

        clearErrors();
    }

    _renderError(error, index) {

        return (
            <div className="error" key={index}>{error}</div>
        );
    }

    render () {

        const {errors = []} = this.props;

        if (errors.length < 1) {
            return null;
        }

        return (
            <ModalComponent>
                <div className="error__container">
                    <div className="sub-container">
                        {errors.map((error, index) => this._renderError(error, index))}
                        <div>
                            <button onClick={this._clearClickHandler.bind(this)}>Закрыть</button>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        );
    }

}

export default connect(mapStateToProps, matchDispatchToProps)(ErrorModalWindow);