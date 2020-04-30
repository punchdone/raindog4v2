import React from 'react';

const emailItem = (props) => (
    <div className="col s6 m4 l3">
        <div className="card darken-1" style={{ height: "120px" }}>
            <p>{props.email}</p>
            <p>{props._id}</p>
            <div className="content-action center">
                <button className="btn-flat btn-small grey white-text" onClick={() => props.onDelete(props._id)}>Delete</button>
            </div>
        </div>
    </div>
);

export default emailItem;