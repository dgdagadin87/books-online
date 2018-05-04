import React, {Component} from 'react';
import {connect} from 'react-redux';

import ModalComponent from '../components/ModalComponent';

const mapStateToProps = (state) => {
    return {
        errors: state.commonData.errors
    };
};

class ErrorModalWindow extends Component {

    _renderError(error, index) {

        return (
            <div key={index}>{error}</div>
        );
    }

    render () {

        const {errors = []} = this.props;

        if (errors.length < 1) {
            return null;
        }

        return (
            <ModalComponent>
                <div style={{display:'table-cell', verticalAlign:'middle'}}>
                    <div style={{background: '#ffffff', width:'200px', margin:'auto'}}>
                        {errors.map((error, index) => this._renderError(error, index))}
                    </div>
                </div>
            </ModalComponent>
        );
    }

}

export default connect(mapStateToProps)(ErrorModalWindow);