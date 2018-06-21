import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {changeTitle} from '../../actions/common';

const mapStateToProps = (state) => {
    return {
        notReadCount: state.notificationsData.notReadCount
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        changeTitle: changeTitle
    }, dispatch);
}

class Notifications extends Component {

    constructor(props) {

        super(props);

        this.state = {
            displayList: false
        };
    }

    _onBadgeClick (ev) {

        if (ev.target.classList.contains('notifications-prevent')) {
            return;
        }

        const {displayList} = this.state;

        this.setState({
            displayList: !displayList
        });
    }

    render() {

        const {notReadCount = 0} = this.props;
        const {displayList = false} = this.state;

        return (
            <div className="notifications__number" onClick={this._onBadgeClick.bind(this)}>
                {notReadCount}
                <div
                    className="notifications-prevent"
                    style={{background: '#ffffff', border:'1px solid red', color:'#333', position:'absolute', top:'30px', right:'1px', display: displayList ? 'block' : 'none'}}
                >
                    qwerty
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);