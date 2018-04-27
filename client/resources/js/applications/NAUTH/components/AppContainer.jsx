import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Route, Switch } from 'react-router-dom';

import LoginComponent from './modules/LoginComponent';
import RegisterComponent from './modules/RegisterComponent';
import ResetComponent from './modules/ResetComponent';

class AppContainer extends Component {

    render () {

        return (
            <div className="not-auth__container">
                <Switch>
                    <Route exact path="/" render={ (props) => <LoginComponent {...props} /> } />
                    <Route path="/register" render={ (props) => <RegisterComponent{...props} /> } />
                    <Route path="/reset" render={ (props) => <ResetComponent {...props} /> } />
                </Switch>
            </div>
        );
    }

}

export default AppContainer;