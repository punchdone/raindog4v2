import React from 'react';

const item = (props) => {
    console.log('props = ', props);
    return (
        <div 
            key={props._id}
            className="card blue-grey darken-1 small"
        >
            <div 
                className="card-content white-text"
            >
                <span className="card-title center">
                    {props.title}
                </span>
                <p>ID: {props._id}</p>
            </div>
            <div className="card-action center">
                <button
                    className="btn-flat btn-small green white-text"
                    style={{ margin: '0 0 5px 0px' }}
                    onClick={() => props.handleClick()}
                >
                    Select
                </button>
                <br />
                <button
                    className="btn-flat btn-small blue white-text"
                    style={{ margin: '0 0 5px 0'}}
                    onClick={() => props.viewProduct(props._id)}
                >
                    Details
                </button>
                <br />
                <button
                    className="btn-flat btn-small red white-text"
                    onClick={() => props.removeProduct(props._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
};

export default item;
