import React from 'react';

const addressItem = (props) => (
    <li>
        <p>{props.name}</p>
        <p>{props.address1}</p>
        <p>{props.address2}</p>
        <p>{props.city}, {props.state}  {props.zip}</p>
        <button onClick={props.onDelete}>Delete</button>
    </li>
);

export default addressItem;