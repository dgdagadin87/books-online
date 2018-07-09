import React, {Component} from 'react';

class ModalWindow extends Component {

    render () {

        const {innerHeight, innerWidth} = window;

        return (
            <div className="modal__root"
                style={{
                    width: innerWidth,
                    height: innerHeight
                }}
            >
                {this.props.children}
            </div>
        );
    }

}

export default ModalWindow;