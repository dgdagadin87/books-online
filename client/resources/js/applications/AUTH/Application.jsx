import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/promise';

import '../../../css/style.css';

import React from 'react';
import reactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import history from '../../service/history';
import allReducers from './reducers/reducers';

import Request from '../../core/request';
import {createUrl} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

import AppContainer from './components/AppContainer';
import actions from '../../config/actions';

const rootDomComponent = document.getElementById('main-body');

const store = createStore(allReducers, applyMiddleware(thunk));

Request.send({
    url: createUrl(defaultSettings, urlSettings['common']),
    method: 'GET'
})
.then((data) => {

    store.dispatch({
        type: actions.COMMON_SET_USER_DATA,
        payload: data
    });

    reactDom.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route
                        path="/"
                        render={ (props) => <AppContainer {...props} commonData={data} /> }
                    />
                </Switch>
            </ConnectedRouter>
        </Provider>,
        rootDomComponent
    );
})
.catch((error) => {
    console.log('error', error);
    const {message} = error;
});