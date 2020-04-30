import React from 'react';

import AddressList from '../../../containers/client/address/AddressList';
import AddressForm from '../../../containers/client/address/AddressForm';

const addressCard = (props) => {
    const form = props.showAddress ?  <AddressForm addAddress={props.addAddress}/> : null;
    return (
        <div>
            <h5><span>Addresses</span></h5>
            <AddressList
                updateShowAddress={props.updateShowAddress}
                addresses={props.addresses}
                removeAddress={props.removeAddress} />
            {form}
        </div>
    )
};

export default addressCard;