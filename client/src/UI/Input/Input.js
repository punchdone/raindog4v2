import React from 'react';
import Select from 'react-select';

const input = ( props ) => {

    let inputElement = null;

    switch ( props.elementType ) {
        case ( 'input' ):
            // console.log('[text] props = ', props);
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            // console.log('[select] props = ', props);
            // console.log('props.elementConfig.options = ', props.elementConfig.options);
            // let options = props.elementConfig.options;
            inputElement = 
                <Select 
                    name={props.elementConfig.type} 
                    options={props.elementConfig.options}
                    onChange={props.changed} />;
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
    }
    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;