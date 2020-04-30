import React from 'react';

const simpleConfirm = (props) => {
    console.log('props = ', props);
    return (
        <div>
            <h5>Selection Confirmation</h5>
            Door: {props.orderHeader[0].selection}<br />
            Top Drawer: {props.orderHeader[1].selection}<br />
            Material: {props.orderHeader[2].selection}<br />
            Interior: {props.orderHeader[3].selection}<br />
            Finish: {props.orderHeader[4].selection}<br />
            <button 
                className="btn-flat btn-small blue white-text"
                onClick={() => props.orderSubmit(props.orderHeader)}>
                    Start Order
            </button>
        </div>
    )
};

export default simpleConfirm;