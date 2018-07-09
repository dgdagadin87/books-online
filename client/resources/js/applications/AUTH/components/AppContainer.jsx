import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import {connect} from 'react-redux';

import HeaderComponent from './common/HeaderComponent';
import FooterComponent from './common/FooterComponent';
import TitleComponent from './common/TitleComponent';

import MyBooksComponent from './modules/MyBooksComponent';
import AllBooksComponent from './modules/AllBooksComponent';
import AddBookComponent from './modules/AddBookComponent';
import UsersComponent from './modules/UsersComponent';
import AddUserComponent from './modules/AddUserComponent';
import EditUserComponent from './modules/EditUserComponent';
import ProfileComponent from './modules/ProfileComponent';
import AboutComponent from './modules/AboutComponent';
import NotFoundComponent from './modules/NotFoundComponent';

import ErrorWindow from '../../../ui/modules/ErrorModule';

const mapStateToProps = (state) => {
    return {
        commonData: state.commonData.userData
    };
};

class AppContainer extends Component {

    render () {

        const {commonData} = this.props;

        return (
            <div className="main-container">
                <div className="main-center">
                    <HeaderComponent serverData={commonData} />
                    <TitleComponent />
                    <Switch>
                        <Route exact path="/" render={ (props) => <MyBooksComponent {...props} /> } />
                        <Route path="/allbooks" render={ (props) => <AllBooksComponent{...props} /> } />
                        <Route path="/addbook" render={ (props) => <AddBookComponent {...props} /> } />
                        <Route path="/users">
                            <Switch>
                                <Route path="/users/adduser" render={ (props) => <AddUserComponent {...props} /> } />
                                <Route path="/users/edituser/:id" render={ (props) => <EditUserComponent {...props} /> } />
                                <Route exact path="/users" render={ (props) => <UsersComponent {...props} /> } />
                            </Switch>
                        </Route>
                        <Route path="/profile" render={ (props) => <ProfileComponent {...props} /> } />
                        <Route path="/about" render={ (props) => <AboutComponent {...props} /> } />
                        <Route component={NotFoundComponent} />
                    </Switch>
                </div>
                <FooterComponent />
                <ErrorWindow />
            </div>
        );
    }

}

export default connect(mapStateToProps)(AppContainer);