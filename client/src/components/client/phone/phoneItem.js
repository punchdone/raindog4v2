import React from 'react';

const phoneItem = (props) => (
    <div className="col s6 m4 l3">
        <div className="card darken-1" style={{ height: "120px" }}>
            <p>{props.phone}</p>
            <div className="content-action center">
                <button className="btn-flat btn-small grey white-text" onClick={() => props.onDelete(props._id)}>Delete</button>
            </div>
        </div>
    </div>
);

export default phoneItem;