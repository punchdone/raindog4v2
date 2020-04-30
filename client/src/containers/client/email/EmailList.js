import React, { Component } from 'react';

import EmailItem from '../../../components/client/email/emailItem';

class EmailList extends Component {

    
    renderEmails() {
        if(this.props.emails) {
            return this.props.emails.map((email, index) => {
                return (
                    <EmailItem key={email._id} {...email} onDelete={this.props.removeEmail} />
                )
            })
        }
    }
    render() {
        return (
            <div className="row">
                    {this.renderEmails()}
                    <div className="col s6 m4 l3">
                        <div className="card darken-1" style={{ height: "124px" }}>
                            <div className="card-title center">Add Email</div>
                            <div className="card-content center">
                                <button onClick={() => this.props.updateShowEmail()} className="green btn-floating btn-large white-text center"><i className="material-icons">add</i></button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
};

export default EmailList;