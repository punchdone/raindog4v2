import React, { Component } from 'react';
import { updateObject } from '../../shared/utility';
import Input from '../../UI/Input/Input';

import { sampleFinishForm, sampleDoorForm } from '../forms';

class SampleForm extends Component {

    state = {
        type: '',
        sampleForm: {}
    };
    handleTypeChange = this.handleTypeChange.bind(this);
    onSubmit = this.onSubmit.bind(this);
    
    
    handleInputChange = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.sampleForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedSampleForm = updateObject(this.state.sampleForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedSampleForm) {
            formIsValid = updatedSampleForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({sampleForm: updatedSampleForm, formIsValid: formIsValid});
    }

    // handleMaterialChange(event) {
    //     this.setState({ material: event.target.value });
    // }

    // handleFinishChange(event) {
    //     this.setState({ finish: event.target.value });
    // }

    async handleTypeChange(event) {
        console.log('[handleTypeChange] event.target.value = ', event.target.value);
        await this.setState({ type: event.target.value });
        console.log('[handleTypeChange] this.state.type = ', this.state.type);
        if(this.state.type === 'finish') {
            this.setState({ sampleForm: sampleFinishForm })
        } else if (this.state.type === 'door') {
            this.setState({ sampleForm: sampleDoorForm });
        }

    }

    onSubmit(e) {
        e.preventDefault();
        const newData = {...this.state.sampleForm};
        Object.keys(newData).map(k => {newData[k] = newData[k].value});
        newData.type = this.state.type;
        this.props.addSample(newData);
        this.setState({ type: '', sampleForm: {} });
    }

    render() {

        const formElementsArray = [];

        for(let key in this.state.sampleForm) {
            formElementsArray.push({
                id: key,
                config: this.state.sampleForm[key]
            });
        }

        let fields = (
            <div>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.handleInputChange(event, formElement.id)} 
                    />
                ))}
            </div>
        );

        return (
            <form>
                <label>Type</label>
                <select value={this.state.type} name="type" defaultValue={this.state.type} style={{ 'display': 'inline-block' }} onChange={this.handleTypeChange}>
                    <option value="" disabled>Choose your option</option>
                    <option value="finish">Finish</option>
                    <option value="door">Door</option>
                </select>
                {fields}
                <button
                    onClick={this.onSubmit}
                    className="green btn-flat white-text"
                    style={{ margin: "0 0 5px 0" }}
                >
                    Checkout
                </button>
            </form>
        )
    }
};

export default SampleForm;