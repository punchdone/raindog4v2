import React from 'react';

const item = (props) => {
    console.log('props = ', props);
    return (
        <div key={props.products._id}>
            <p>Here is an item!</p>
        </div>
    )
};

export default item;
