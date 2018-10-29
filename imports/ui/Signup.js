/******************************************
 *  Author : Jake   
 *  Created On : Tue Oct 23 2018
 *  File : Signup.js
 *******************************************/

 
import React                from 'react';

import { Link }             from 'react-router';
import { Accounts }         from 'meteor/accounts-base';


export default class Signup extends React.Component {

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

        // Pasword length validation is client side, email validation is server side.
        if ( password.length < 9 ) return this.setState({ error: 'Pasword must be at least 8 characters' });

        Accounts.createUser({ email, password }, (error) => {

            if ( error ) this.setState({ error: error.reason });
            else this.setState({ error: '' });

        });

    }

    render () {

        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join to Short Lnk</h1>

                    {this.state.error ?  <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <input type="password" ref="password" name="password" placeholder="Password" />
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );

    }

}



/*** Scripts end... */