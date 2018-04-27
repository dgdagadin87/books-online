import React from 'react';
import {Route, Link} from 'react-router-dom';

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => {

    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({match}) => {
            return (
                <span style={{fontWeight: (match ? 'bold' : 'normal')}}
                     className={'link' + (match ? ' main-navigation__active' : '')}>
                    <Link to={to}>{label}</Link>
                </span>
            );
        }}/>
    );
};

export default OldSchoolMenuLink;