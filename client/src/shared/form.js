import React, { Component } from 'react';

// import Input from '../UI/Input/Input';
// import { updateObject } from './utility';

class Form extends Component {
    render() {
        console.log('this.props.showForm = ', this.props.showForm);
        return (
            <div>
                <p>This is the form!</p>
            </div>
        )
    }
};

export default Form;