import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = () => {
    return {};
};

class About extends Component {

    render() {

        return (
            <div>
                О программе - полное описание здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps)(About);