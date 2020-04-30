import React from 'react';

const item = (props) => {
    console.log('props = ', props);
    return (
        <li>
            {props.selection}
            <button 
                className="btn-small btn-flat grey white-text"
                style={{ margin: '0 0 5px 5px '}}
                onClick={() => props.removeMaterial(props.finishId, props._id)}
            >
                Delete
            </button>
        </li>
    )
};

export default item;
