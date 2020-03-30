import React, { Component } from 'react';

import AddressItem from '../../components/client/addressItem';

class AddressList extends Component {

    removeAddress(id) {
        console.log('[removeAddress] id = ', id);
    }

    renderAddresses() {
        return this.props.addresses.map((address, index) => {
            return (
                <AddressItem key={address._id} {...address} onDelete={this.removeAddress(address._id)} />
            )
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.renderAddresses()}
                </ul>
            </div>
        )
    }
};

export default AddressList;