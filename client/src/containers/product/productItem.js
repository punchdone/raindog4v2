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
                    style={{ margin: '0 0 5px 10px' }}
                    onClick={() => props.handleClick()}
                >
                    Select
                </button>
            </div>
        </div>
    )
};

export default item;
