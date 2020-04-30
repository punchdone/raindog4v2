import React from 'react';

import List from './list';
import Form from './form';

// props needed: showForm

const card = (props) => {
    console.log('props = ', props);
    const form = props.showForm ? <Form addItem={props.addItem} /> : null;
    return (
        <div>
            <h5><span>This is the card!</span></h5>
            <List {...props[0]} updateShowItem={props.updateShowItem} />
            {form}
        </div>
    )
};

export default card;