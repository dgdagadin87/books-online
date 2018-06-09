import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import HeaderComponent from './common/HeaderComponent';
import FooterComponent from './common/FooterComponent';
import TitleComponent from './common/TitleComponent';

import MyBooksComponent from './modules/MyBooksComponent';
import AllBooksComponent from './modules/AllBooksComponent';
import AddBookComponent from './modules/AddBookComponent';
import UsersComponent from './modules/UsersComponent';
import AboutComponent from './modules/AboutComponent';

import ErrorWindow from '../../../ui/modules/ErrorModule';

class AppContainer extends Component {

    render () {

        const {commonData} = this.props;

        return (
            <div className="main-container">
                <div className="main-center">
                    <HeaderComponent serverData={commonData} />
                    <Switch>
                        <Route exact path="/" render={ (props) => <MyBooksComponent {...props} /> } />
                        <Route path="/allbooks" render={ (props) => <AllBooksComponent{...props} /> } />
                        <Route path="/addbook" render={ (props) => <AddBookComponent {...props} /> } />
                        <Route path="/users" render={ (props) => <UsersComponent {...props} /> } />
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