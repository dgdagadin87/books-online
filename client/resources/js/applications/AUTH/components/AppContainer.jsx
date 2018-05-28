import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderComponent from './common/HeaderComponent';
import FooterComponent from './common/FooterComponent';
import TitleComponent from './common/TitleComponent';

import BooksComponent from './modules/BooksComponent';
import StatisticsComponent from './modules/StatisticsComponent';
import ProfileComponent from './modules/ProfileComponent';
import NotificationsComponent from './modules/NotificationsComponent';
import AboutComponent from './modules/AboutComponent';

import ErrorWindow from '../../../ui/modules/ErrorModule';

class AppContainer extends Component {

    render () {

        const {commonData} = this.props;

        return (
            <div className="app-auth__container">
                <div className="app-auth__center">
                    <HeaderComponent serverData={commonData} />
                    <TitleComponent />
                    <Switch>
                        <Route exact path="/" render={ (props) => <BooksComponent {...props} /> } />
                        <Route path="/statistics" render={ (props) => <StatisticsComponent{...props} /> } />
                        <Route path="/profile" render={ (props) => <ProfileComponent {...props} /> } />
                        <Route path="/notifications" render={ (props) => <NotificationsComponent {...props} /> } />
                        <Route path="/about" render={ (props) => <AboutComponent {...props} /> } />
                    </Switch>
                </div>
                <FooterComponent />
                <ErrorWindow />
            </div>
        );
    }

}

export default AppContainer;