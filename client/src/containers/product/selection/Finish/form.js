import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateObject } from '../../../../shared/utility';
import Input from '../../../../components/UI/Input/Input';
import { finishMaterialForm } from '../../../forms';
import * as actions from '../../../../store/actions';

// import Input from '../UI/Input/Input';
// import { updateObject } from './utility';

class Form extends Component {

    state = {
        finishMaterialForm: finishMaterialForm
    }
    onSubmit = this.onSubmit.bind(this);

    handleInputChange = (event, inputIdentifier) => {
        console.log('[handleInputChange] inputIdentifier = ', inputIdentifier);
        console.log('[handleInputChange] event = ', event);
        if(inputIdentifier === 'materials') {
            event.target = {};
            event.target.value = event.value;
        }
        const updatedFormElement = updateObject(this.state.finishMaterialForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedFinishMaterialForm = updateObject(this.state.finishMaterialForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedFinishMaterialForm) {
            formIsValid = updatedFinishMaterialForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({finishMaterialForm: updatedFinishMaterialForm, formIsValid: formIsValid});
        console.log('[handleInputChange] updatedFinishForm = ', updatedFinishMaterialForm);
    }

    onSubmit(event) {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.finishMaterialForm) {
            formData[formElementIdentifier] = this.state.finishMaterialForm[formElementIdentifier].value;
            this.state.finishMaterialForm[formElementIdentifier].value = "";
        }
        console.log('[onSubmit] formData = ', formData);
        this.props.onAddFinishMaterial(this.props.finishId, formData.materials);
    }

    render() {

        console.log('this.props = ', this.props);

        const materials = this.props.materialSelections;
        const materialsArray = [];
        for (let key in materials) {
            materialsArray.push({
                value: materials[key]._id,
                label: materials[key].selection
            });
        }
        let finishMaterialForm = {...this.state.finishMaterialForm};
        finishMaterialForm.materials.elementConfig.options = materialsArray;

        const formElementsArray = [];
        
        for(let key in finishMaterialForm) {
            formElementsArray.push({
                id: key,
                config: finishMaterialForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        label={formElement.config.label}
                        value={formElement.config.value}
                        changed={(event) => this.handleInputChange(event, formElement.id)} 
                    />
                ))}
                <button
                    onClick={this.onSubmit}
                    className="green btn-flat white-text"
                    style={{ margin: '10px 0 100px 0 '}}>
                        Add Material/Wood
                </button>  
           </form>
        );

        return (
            <div>
                <p>FinishId: {this.props.finishId}</p>
                {form}
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddFinishMaterial: (finishId, materialId) => dispatch( actions.addFinishMaterial(finishId, materialId))
    }
};

export default connect(null, mapDispatchToProps)(Form);