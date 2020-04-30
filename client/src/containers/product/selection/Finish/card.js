import React from 'react';

import List from './list';
import Form from './form';

// props needed: showForm

const card = (props) => {
    console.log('props = ', props);
    return (
        <div>
            <h5><span>This is the materials card!</span></h5>
            <p>FinishId: {props.finishId}</p>
            <List 
                {...props} 
                removeMaterial={props.removeMaterial} />
            <Form 
                addMaterial={props.addMaterial} 
                materialSelections={props.materialSelections} 
                finishId={props.finishId} />
        </div>
    )
};

export default card;