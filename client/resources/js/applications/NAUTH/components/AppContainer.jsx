import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginComponent from './modules/LoginComponent';
import RegisterComponent from './modules/RegisterComponent';
import ResetComponent from './modules/ResetPasswordComponent';

import ErrorWindow from '../../../ui/modules/ErrorModule';

class AppContainer extends Component {

    render () {

        return (
            <div className="app-not-auth__container">
                <Switch>
                    <Route exact path="/" render={ (props) => <LoginComponent {...props} /> } />
                    <Route path="/register" render={ (props) => <RegisterComponent{...props} /> } />
                    <Route path="/reset" render={ (props) => <ResetComponent {...props} /> } />
                </Switch>
                <ErrorWindow />
            </div>
        );
    }

}

export default AppContainer;