import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input';
import { updateObject } from '../../../shared/utility';

class EmailForm extends Component {

    state = {
        emailForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                label: 'Email',
                value: '',
                valid: true
            }
        }
    }

    handleChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.emailForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedEmailForm = updateObject(this.state.emailForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedEmailForm) {
            formIsValid = updatedEmailForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({emailForm: updatedEmailForm, formIsValid: formIsValid});
    }

    emailHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.emailForm) {
            formData[formElementIdentifier] = this.state.emailForm[formElementIdentifier].value;
        }
        console.log('[emailHandler] formData = ', formData);
        this.props.addEmail(formData);
        for (let key in this.state.emailForm) {
            this.state.emailForm[key].value = '';
        }
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.emailForm) {
            formElementsArray.push({
                id: key,
                config: this.state.emailForm[key]
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
                <button onClick={this.emailHandler} className="green btn-flat white-text" style={{ margin: "0px 0px 10px 0px" }}>Add Email</button>
            </form>
        );

        return (
            <div>
                <span>Add Email</span>
                {form}
            </div>
        )
    }
};

export default EmailForm;