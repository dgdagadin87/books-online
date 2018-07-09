import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginComponent from './modules/LoginComponent';

import ErrorWindow from '../../../ui/modules/ErrorModule';

class AppContainer extends Component {

    render () {

        return (
            <div className="login-container">
                <Switch>
                    <Route exact path="/" render={ (props) => <LoginComponent {...props} /> } />
                </Switch>
                <ErrorWindow />
            </div>
        );
    }

}

export default AppContainer;