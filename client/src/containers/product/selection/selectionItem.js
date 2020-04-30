import React from 'react';

const selectionItem = (props) => (
    <li className="collection-item">
        <span style={{ textTransform: 'capitalize' }}>{props.type}</span> - <span style={{ textTransform: 'capitalize' }}>{props.selection}</span>  (<i>{props._id}</i>)
        <button 
            className="btn-small btn-flat grey white-text"
            style={{ margin: '0 0 5px 5px' }}
            onClick={() => props.removeSelection(props._id)}>
                Delete
        </button>
    </li>
);

export default selectionItem;