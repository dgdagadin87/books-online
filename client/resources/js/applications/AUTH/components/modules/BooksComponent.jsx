import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = () => {
    return {};
};

class Books extends Component {

    render() {

        return (
            <div>
                Книги - можно выбрать здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps)(Books);