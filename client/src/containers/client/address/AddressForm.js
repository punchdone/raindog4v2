import React, { Component } from 'react';

import Input from '../../../UI/Input/Input';
import { updateObject } from '../../../shared/utility';

class AddressForm extends Component {
    state = {
        addressForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Client(s) name'
                },
                label: 'Name',
                value: '',
                valid: true
            },
            address1: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                label: 'Address',
                value: '',
                valid: true
            },
            address2: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                label: '',
                value: '',
                valid: true
            },
            city: { 
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                label: 'City',
                value: '',
                valid: true
            },
            state: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                label: 'State',
                value: '',
                valid: true
            },
            zip: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip'
                },
                label: 'Zip',
                value: '',
                valid: true
            }
        }
    }

    addressHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.addressForm) {
            formData[formElementIdentifier] = this.state.addressForm[formElementIdentifier].value;
        }
        this.props.addAddress(formData);
        console.log('this.state.addressForm = ', this.state.addressForm);
        for (let key in this.state.addressForm) {
            console.log('trying to break it up: ', key, ' = ', this.state.addressForm[key].value);
            this.state.addressForm[key].value = '';
        }
        
    }

    handleChange = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(this.state.addressForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedAddressForm = updateObject(this.state.addressForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedAddressForm) {
            formIsValid = updatedAddressForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({addressForm: updatedAddressForm, formIsValid: formIsValid});
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.addressForm) {
            formElementsArray.push({
                id: key,
                config: this.state.addressForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.handleChange(event, formElement.id)} />
                ))}
                <button onClick={this.addressHandler} className="green btn-flat white-text">Add Address</button>
            </form>
        );

        return (
            <div>
                <span>Add Address</span>
                {form}
            </div>
        );
    }
};

export default AddressForm;