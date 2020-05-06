import React, { Component } from 'react';
import { updateObject } from '../../../shared/utility';
import Select from 'react-select';

//import Input from '../../../UI/Input';
import Input from '../../../components/UI/Input/Input'
import { orderHeaderForm } from '../../forms';

class HeaderForm extends Component {

    state = {
        selections: orderHeaderForm
    }

    handleInputChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.selections[inputIdentifier], {
            value: event.target.value
        });
        const updatedHeaderForm = updateObject(this.state.selections, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedHeaderForm) {
            formIsValid = updatedHeaderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ selections: updatedHeaderForm, formIsValid: formIsValid });
    }

    onSubmit(e) {
        e.preventDefault();

    }

    render() {

        const formElementsArray = [];

        for(let key in this.state.selections) {
            formElementsArray.push({
                id: key,
                config: this.state.selections[key]
            });
        }

        console.log(formElementsArray);

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <div>
                        <label for={formElement.id}>{formElement.label}</label>
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.handleInputChange(event, formElement.id)} 
                        />
                     </div>
                ))}
            </form>
        )

        const woodOptions = [
            { value: 'maple', label: 'Maple' },
            { value: 'cherry', label: 'Cherry' },
            { value: 'alderClear', label: 'Alder, Clear' },
            { value: 'alderKnotty', label: 'Alder, Knotty' },
            { value: 'paint', label: 'Paintable'}
        ];

        return (
            <div>
                <div className="input-field col s12">
                    <label for="material">Material/Wood</label>
                    <Select name="material" options={woodOptions} />
                </div>
                
                
                {form}
            </div>
        )
    }
};

export default HeaderForm;