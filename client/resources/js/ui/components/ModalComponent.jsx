import React, {Component} from 'react';

class ModalWindow extends Component {

    render () {

        const {innerHeight, innerWidth} = window;

        return (
            <div
                style={{
                    top: '0',
                    left: '0',
                    width: innerWidth,
                    height: innerHeight,
                    zIndex:'100',
                    position: 'fixed',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'table'
                }}
            >
                {this.props.children}
            </div>
        );
    }

}

export default ModalWindow;