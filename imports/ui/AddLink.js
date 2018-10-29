/******************************************
 *  Author : Jake   
 *  Created On : Thu Oct 25 2018
 *  File : AddLink.js
 *******************************************/


import React                    from 'react';
import Modal                    from 'react-modal';

import { Meteor }               from 'meteor/meteor';


export default class AddLink extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            url         : '',
            isOpen      : false,
            error       : ''
        };

    }

    onSubmit (event) {

        event.preventDefault();

        const url = this.state.url;

        Meteor.call('links.insert', url, (error, response) => {

            if ( !error ) this.this.handleModalClose();
            else this.setState({ error: error.reason });

        });

    }

    onChange (event) {

        this.setState({
            url: event.target.value.trim()
        });

    }

    handleModalClose () {

        this.setState({ 
            isOpen: false, 
            url: '', 
            error: '' });

    }

    render () {

        return (
            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>

                <Modal isOpen={this.state.isOpen}
                       contentLabel="Add link modal"
                       className="boxed-view__box"
                       overlayClassName="boxed-view boxed-view--modal"
                       onRequestClose={() => this.handleModalClose()}
                       onAfterOpen={() => this.refs.url.focus()}>
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input type="text"
                               ref="url" 
                               placeholder="URL" 
                               value={this.state.url}
                               onChange={this.onChange.bind(this)} />
                        <button className="button">Add Link</button>
                        <button className="button button--secondary" type="button" onClick={() => this.handleModalClose().bind(this)}>Close</button>
                    </form>
                </Modal>
            </div>
        );

    }

}



/*** Scripts end... */