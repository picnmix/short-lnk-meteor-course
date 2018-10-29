/******************************************
 *  Author : Jake   
 *  Created On : Wed Oct 24 2018
 *  File : routes.js
 *******************************************/


import React                from 'react';

import { Meteor }           from 'meteor/meteor';
import { Router,
         Route,
         browserHistory }   from 'react-router';

import Signup               from './../ui/Signup';
import Link                 from './../ui/Link';
import NotFound             from './../ui/NotFound';
import Login                from './../ui/Login';


const unauthenticatedPages  = ['/', '/signup'];
const authenticatedPages    = ['/links'];

const onEnterPublicPage     = () => {

  if ( Meteor.userId() ) browserHistory.replace('/links');

};

const onEnterPrivatePage     = () => {

  if ( !Meteor.userId() ) browserHistory.replace('/');

};

export const onAuthChange = (isAuthenticated) => {

    const pathname              = browserHistory.getCurrentLocation().pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAauthenticatedPage  = authenticatedPages.includes(pathname);

    // If accessing unauthenticated page & user is logged in redirect to /links.
    if ( isUnauthenticatedPage && isAuthenticated ) browserHistory.replace('/links');

    // If accessing authenticatetd page & user is not logged in redirect to /.
    if ( isAauthenticatedPage && !isAuthenticated ) browserHistory.replace('/');

};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/"           component={Login}     onEnter={onEnterPublicPage} />
    <Route path="/signup"     component={Signup}    onEnter={onEnterPublicPage} />
    <Route path="/links"      component={Link}      onEnter={onEnterPrivatePage} />
    <Route path="*"           component={NotFound} />
  </Router>
);





/*** Scripts end... */