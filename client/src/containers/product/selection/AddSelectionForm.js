import React, { Component } from 'react';
import { updateObject } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';

import { selectionForm } from '../../forms';

class AddSelectionForm extends Component {

    state = {
        selectionForm: selectionForm
    }
    onSubmit = this.onSubmit.bind(this);

    handleInputChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.selectionForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedSelectionForm = updateObject(this.state.selectionForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedSelectionForm) {
            formIsValid = updatedSelectionForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({selectionForm: updatedSelectionForm, formIsValid: formIsValid});
    }

    onSubmit(event) {
        event.preventDefault();
        let formData = {};
        formData.type = this.props.type;
        for (let formElementIdentifier in this.state.selectionForm) {
            formData[formElementIdentifier] = this.state.selectionForm[formElementIdentifier].value;
            this.state.selectionForm[formElementIdentifier].value = "";
        }
        this.props.addSelection(formData);
        console.log('[onSubmit] formData = ', formData);
        // this.setState({ this.state.selectionForm})
    }

    render() {

        const formElementsArray = [];

        for(let key in this.state.selectionForm) {
            formElementsArray.push({
                id: key,
                config: this.state.selectionForm[key]
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
                        changed={(event) => this.handleInputChange(event, formElement.id)} 
                    />
                ))}
                <button
                    onClick={this.onSubmit}
                    className="green btn-flat white-text"
                    style={{ margin: '0 0 5px 0 '}}>
                        Add selection
                </button>  
           </form>
        );

        return (
            <div>
                {form}
            </div>
        )
    }
}

export default AddSelectionForm;