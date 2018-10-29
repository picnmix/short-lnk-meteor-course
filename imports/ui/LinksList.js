/******************************************
 *  Author : Jake   
 *  Created On : Wed Oct 24 2018
 *  File : LinksList.js
 *******************************************/


import React                from 'react';
import FlipMove             from 'react-flip-move';

import { Meteor }           from 'meteor/meteor';
import { Tracker }          from 'meteor/tracker';
import { Session }          from 'meteor/session';

import { Links }            from './../api/links';
import LinksListItem        from './LinksListItem';


export default class LinksList extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            links: []
        };

    }

    componentDidMount () {

        this.linksTracker = Tracker.autorun(() => {

            // Subscribe initiates the miniMongo DB
            // creating whichever documents have been allowed.
            Meteor.subscribe('linksPub');

            const links = Links.find({ 
                visible: Session.get('showVisible') 
            }).fetch();
        
            this.setState({ links });
        
        });

    }

    componentWillUnmount () {

        this.linksTracker.stop();

    }

    renderLinksListItems () {

        if ( this.state.links.length === 0 ) {

            return (
                <div className="item">
                    <p className="item__status-message">No links found</p>
                </div>
            );

        }

        else {

            return this.state.links.map( link => {

                const shortUrl = Meteor.absoluteUrl(link._id);

                return (
                    <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
                );

            } );

        }

    }

    render () {

        return (
            <div> 
                <div>
                    <FlipMove maintainContainerHeight={true}>
                        {this.renderLinksListItems()}
                    </FlipMove>
                </div>
            </div>
        );

    }

}



/*** Scripts end... */