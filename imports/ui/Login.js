/******************************************
 *  Author : Jake   
 *  Created On : Wed Oct 24 2018
 *  File : Login.js
 *******************************************/


import React                from 'react';

import { Link }             from 'react-router';
import { Meteor }           from 'meteor/meteor'


export default class Login extends React.Component {

    constructor (props) {

        super(props);

        // The STATE object is always available to a component.
        // Similar to the PROPS object but STATE is internal only.
        this.state = {
            error: ''
        };

    }

    onSubmit (event) {

        event.preventDefault();

        let email       = this.refs.email.value.trim();
        let password    = this.refs.password.value.trim();

        Meteor.loginWithPassword(email, password, (error) => {

            if ( error ) this.setState({ error: 'Unable to login, check email & password' });
            else this.setState({ error: '' });

        });

    }

    render () {

        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Short Lnk</h1>

                    {this.state.error ?  <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password" />
                        <button className="button">Login</button>
                    </form>

                    <Link to="/signup">Signup for an account?</Link>
                </div>
            </div>
        );

    }

}



/*** Scripts end... */