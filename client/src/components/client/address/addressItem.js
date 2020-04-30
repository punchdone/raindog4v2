import React from 'react';

const addressItem = (props) => (
    <div className="col s6 m4 l3">
        <div className="card darken-1 small" style={{ height: "200px" }}>
            <p>{props.name}</p>
            <p>{props.address1}</p>
            <p>{props.address2}</p>
            <p>{props.city}, {props.state}  {props.zip}</p>
            <div className="conent-action center">
            <button className="btn-flat btn-small grey white-text" onClick={() => props.onDelete(props._id)}>Delete</button>
            </div>
        </div>
    </div>
);

export default addressItem;