import React from 'react';

import AddressList from '../../containers/client/AddressList';
import AddressForm from '../../containers/client/AddressForm';

const addressCard = (props) => (
    <div className="card darken-1">
        <span className="card-title">Addresses</span>
        <AddressList addresses={props.addresses} removeAddress={props.removeAddress} />
        <AddressForm addAddress={props.addAddress}/>
    </div>
);

export default addressCard;