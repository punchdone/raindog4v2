import React from 'react';

const spinner = () => (
    <div 
        className="preloader-wrapper big active center" 
        style={{
            display: 'block',
            position: 'fixed',
            right: '50%',
            margin: '10px 0 10px 0'
         }}>
        <div className="spinner-layer spinner-green-only">
        <div className="circle-clipper left">
            <div className="circle"></div>
        </div><div className="gap-patch">
            <div className="circle"></div>
        </div><div className="circle-clipper right">
            <div className="circle"></div>
        </div>
        </div>
    </div>
);

export default spinner;