import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = () => {
    return {};
};

class Profile extends Component {

    render() {

        return (
            <div>
                Профиль - можно отредактировать здесь.
            </div>
        );
    }
}

export default connect(mapStateToProps)(Profile);