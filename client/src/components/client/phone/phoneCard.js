import React from 'react';

import PhoneList from '../../../containers/client/phone/PhoneList';
import PhoneForm from '../../../containers/client/phone/PhoneForm';

const phoneCard = (props) => {
    const form = props.showPhone ? <PhoneForm addPhone={props.addPhone} /> : null;
    return(
        <div>
            <h5><span>Phone Numbers</span></h5>
            <PhoneList updateShowPhone={props.updateShowPhone} phones={props.phones} removePhone={props.removePhone} />
            {form}
        </div>
    )
};

export default phoneCard;