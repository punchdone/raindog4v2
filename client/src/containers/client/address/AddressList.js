import React, { Component } from 'react';

import AddressItem from '../../../components/client/address/addressItem';

class AddressList extends Component {

    renderAddresses() {
        if(this.props.addresses) {
            return this.props.addresses.map((address, index) => {
                return (
                    <AddressItem key={address._id} {...address} onDelete={this.props.removeAddress} />
                )
            })
           
        }
    }

    render() {
        return (
            <div className="row">
                {this.renderAddresses()}
                <div className="col s6 m4 l3">
                    <div className="card darken-1" style={{ height: "205px" }}>
                        <div className="card-title center">
                            Add Address
                        </div>
                        <div className="card-content center">
                            <button onClick={() => this.props.updateShowAddress()} className="green btn-floating btn-large white-text center"><i className="material-icons">add</i></button>
                        </div>    
                    </div> 
                </div>
            </div>
        )
    }
};

export default AddressList;