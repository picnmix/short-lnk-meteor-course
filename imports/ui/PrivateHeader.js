/******************************************
 *  Author : Jake   
 *  Created On : Thu Oct 25 2018
 *  File : PrivateHeader.js
 *******************************************/


import React                from 'react';
import PropTypes            from 'prop-types';

import { Accounts }         from 'meteor/accounts-base';


const PrivateHeader = (props) => {

    return (
        <div className="header">
            <div className="header-wrapper">
                <h1 className="header-wrapper__title">{props.title}</h1>
                <button className="button button--link-underline" onClick={() => Accounts.logout()}>Logout</button>
            </div>
        </div>
    );

};

PrivateHeader.propTypes = {
    title   : PropTypes.string.isRequired
};

export default PrivateHeader;

/*** Scripts end... */