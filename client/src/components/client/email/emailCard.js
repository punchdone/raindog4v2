import React from 'react';

import EmailList from '../../../containers/client/email/EmailList';
import EmailForm from '../../../containers/client/email/EmailForm';

const emailCard = (props) => {
    const form = props.showEmail ? <EmailForm addEmail={props.addEmail} /> : null;
    return (
        <div>
            <h5><span>Emails</span></h5>
            <EmailList updateShowEmail={props.updateShowEmail} emails={props.emails} removeEmail={props.removeEmail} />
            {form}
        </div>
    )
};

export default emailCard;