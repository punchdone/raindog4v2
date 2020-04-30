import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { reduxForm } from 'redux-form';

import { updateObject } from '../../../../shared/utility';
import Input from '../../../../UI/Input/Input';
import { finishForm } from '../../../forms';
import * as actions from '../../../../store/actions/index';

class FinishAddForm extends Component {

    state = {
        finishForm: finishForm
    }
    // onSubmit = this.onSubmit.bind(this);
    onAddFinish = this.onAddFinish.bind(this);

    handleInputChange = (event, inputIdentifier) => {
        console.log('[handleInputChange] inputIdentifier = ', inputIdentifier);
        console.log('[handleInputChange] event = ', event);
        if(inputIdentifier === 'finishType' || inputIdentifier === 'stocking') {
            event.target = {};
            event.target.value = event.value;
        }
        const updatedFormElement = updateObject(this.state.finishForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedFinishForm = updateObject(this.state.finishForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedFinishForm) {
            formIsValid = updatedFinishForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({finishForm: updatedFinishForm, formIsValid: formIsValid});
        console.log('[handleInputChange] updatedFinishForm = ', updatedFinishForm);
    }

    // onSubmit(event) {
    //     event.preventDefault();
    //     let formData = {};
    //     // formData.type = this.props.type;
    //     for (let formElementIdentifier in this.state.finishForm) {
    //         formData[formElementIdentifier] = this.state.finishForm[formElementIdentifier].value;
    //         this.state.finishForm[formElementIdentifier].value = "";
    //     }
    //     this.props.addFinish(formData);
    //     // console.log('[onSubmit] formData = ', formData);
    //     // console.log('[onSubmit] this.state = ', this.state);
    //     // this.setState({ finishForm: { finishType: { value: '' }, stocking: { value: '' } }});
    // }

    onAddFinish(event) {
        console.log('[onAddFinish] event = ', event);
        console.log('[onAddFinish] this.state.finishForm = ', this.state.finishForm);
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.finishForm) {
            formData[formElementIdentifier] = this.state.finishForm[formElementIdentifier].value;
        }
        this.props.onAddFinish(formData);
        const updateForm = {...this.state.finishForm};
        console.log('[onAddFinish] before updateForm = ', updateForm);
        updateForm.finishType.value = null;
        updateForm.stocking.value = null;
        updateForm.title.value = '';
        this.setState({ finishForm: updateForm });
        console.log('[onAddFinish] after updateForm = ', updateForm);
    }

    render() {

        console.log('this.state = ', this.state);
        const finishTypes = this.props.finishTypes;
        const typeOptionsArray = [];
        for (let key in finishTypes) {
            typeOptionsArray.push({
                value: finishTypes[key]._id,
                label: finishTypes[key].selection
            });
        }
        let finishForm = {...this.state.finishForm};
        finishForm.finishType.elementConfig.options = typeOptionsArray;
        // console.log('typeOptionsArray = ', typeOptionsArray);

        // console.log('this.props.stocking = ', this.props.stocking);
        const stocking = this.props.stocking;
        const stockingOptionsArray = [];
        for (let key in stocking) {
            stockingOptionsArray.push({
                value: stocking[key]._id,
                label: stocking[key].selection
            });
        }
        finishForm.stocking.elementConfig.options = stockingOptionsArray;
        // console.log('stockingOptionsArray = ', stockingOptionsArray);
        // console.log('finishForm = ', finishForm);
        
        
        const formElementsArray = [];
        
        for(let key in finishForm) {
            formElementsArray.push({
                id: key,
                config: finishForm[key]
            });
        }

        console.log('formElementsArray = ', formElementsArray);

        let form = (
            <form onSubmit={this.onAddFinish}>
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
                    type="submit"
                    className="green btn-flat white-text"
                    style={{ margin: '10px 0 100px 0 '}}>
                        Add finish
                </button>  
           </form>
        );

        return (
            <div>
                {form}
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddFinish: (finish) => dispatch(actions.addFinish(finish))
    }
};

export default connect(null, mapDispatchToProps)(FinishAddForm);