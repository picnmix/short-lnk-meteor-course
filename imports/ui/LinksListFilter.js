/******************************************
 *  Author : Jake   
 *  Created On : Thu Oct 25 2018
 *  File : LinksListFilter.js
 *******************************************/


import React                    from 'react';

import { Session }              from 'meteor/session';
import { Tracker }              from 'meteor/tracker';


export default class LinksListFilter extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            showVisible: true
        };

    }

    componentDidMount () {

        this.visibleTracker = Tracker.autorun(() => {

            this.setState({ showVisible: Session.get('showVisible') });

        });

    }

    componentWillUnmount () {

        this.visibleTracker.stop();

    }

    render () {

        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(event) => {
    
                        Session.set('showVisible', !event.target.checked);
    
                    }} />
                    Show hidden links
                </label>
            </div>
        );

    }

}





/*** Scripts end... */