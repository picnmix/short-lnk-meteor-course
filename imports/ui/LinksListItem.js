/******************************************
 *  Author : Jake   
 *  Created On : Thu Oct 25 2018
 *  File : LinksListItem.js
 *******************************************/


import React                from 'react';
import Clipboard            from 'clipboard';
import moment               from 'moment';

import { Meteor }           from 'meteor/meteor';

import { PropTypes }        from 'prop-types';


export default class LinkListItem extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            isCopied: false
        }

    }

    componentDidMount () {

        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard
            .on('success', () => {

                this.setState({ isCopied: true });

                setTimeout(() => this.setState({ isCopied: false }), 1000);

            })
            .on('error', () => {

                console.log('copy error');

            });

    }

    componentWillUnmount () {

        this.clipboard.destroy();

    }

    renderStats () {

        const visitMsg  = this.props.visitedCount === 1 ? 'visit' : 'visits';

        let visitedMsg  = null;

        if ( typeof this.props.lastVisitedAt === 'number' ) {

            visitedMsg = `( visited ${ moment(this.props.lastVisitedAt).fromNow() } )`;

        }

        return (
            <p className="item__message">{this.props.visitedCount} {visitMsg} - {visitedMsg}</p>
        );

    }

    render () {

        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--link button--pill" href={this.props.shortUrl} target="_blank">Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.isCopied ? 'Copied' : 'Copy'}</button>
                <button className="button button--pill" onClick={() => {

                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);

                }}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
            </div>
        );

    }

}

LinkListItem.propTypes = {
    _id             : PropTypes.string.isRequired,
    url             : PropTypes.string.isRequired,
    userId          : PropTypes.string.isRequired,
    shortUrl        : PropTypes.string.isRequired,
    visible         : PropTypes.bool.isRequired,
    //visitedCount    : PropTypes.number.isRequierd,
    lastVisitedAt   : PropTypes.number

}



/*** Scripts end... */