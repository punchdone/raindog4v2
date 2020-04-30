import React, { Component } from 'react';

import Input from '../../../UI/Input/Input';
import { updateObject } from '../../../shared/utility';

class PhoneForm extends Component {

    state = {
        phoneForm: {
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone number'
                },
                label: 'Phone Number',
                value: '',
                valid: true
            }
        }
    }

    handleChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.phoneForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedPhoneForm = updateObject(this.state.phoneForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedPhoneForm) {
            formIsValid = updatedPhoneForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({phoneForm: updatedPhoneForm, formIsValid: formIsValid});
    }

    phoneHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.phoneForm) {
            formData[formElementIdentifier] = this.state.phoneForm[formElementIdentifier].value;
        }
        this.props.addPhone(formData);
        for (let key in this.state.phoneForm) {
            this.state.phoneForm[key].value = '';
        }
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.phoneForm) {
            formElementsArray.push({
                id: key,
                config: this.state.phoneForm[key]
            });
        }
        console.log('formElementsArray = ', formElementsArray);

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.handleChange(event, formElement.id)}
                     />
                ))}
                <button onClick={this.phoneHandler} className="green btn-flat white-text">Add Phone</button>
            </form>
        );

        return (
            <div>
                <span>Add Phone Number</span>
                {form}
            </div>
        )
    }
};

export default PhoneForm;