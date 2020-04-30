import React, { Component } from 'react';

import PhoneItem from '../../../components/client/phone/phoneItem';

class PhoneList extends Component {

    renderPhones() {
        if(this.props.phones) {
            return this.props.phones.map((phone, index) => {
                return (
                    <PhoneItem key={phone._id} {...phone} onDelete={this.props.removePhone} />
                )
            })
        }
    };

    render() {
        return (
            <div className="row">
                {this.renderPhones()}
                <div className="col s6 m4 l3">
                    <div className="card darken-1" style={{ height: "124px" }}>
                        <div className="card-title center">Add Phone</div>
                        <div className="card-content center">
                        <button onClick={() => this.props.updateShowPhone()} className="green btn-floating btn-large white-text center"><i className="material-icons">add</i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default PhoneList;