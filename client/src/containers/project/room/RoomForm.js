import React, { Component } from 'react';

import Input from '../../../components/UI/Input/Input';
import { updateObject } from '../../../shared/utility';

class RoomForm extends Component {
    state = {
        roomForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Room/Specification Group Name'
                },
                label: 'Room/Spec Group',
                value: '',
                valid: true
            },
            type: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Order Type'
                },
                label: 'Order Type',
                value: '',
                valid: true
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Order state'
                },
                label: 'Order state',
                value: '',
                valid: true
            }
        }
    }

    roomHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.roomForm) {
            formData[formElementIdentifier] = this.state.roomForm[formElementIdentifier].value;
        }
        this.props.addRoom(formData);
        console.log('this.state.roomForm = ', this.state.roomForm);
        for (let key in this.state.roomForm) {
            console.log('trying to break it up: ', key, ' = ', this.state.roomForm[key].value);
            this.state.roomForm[key].value = '';
        }
    }

    handleChange = (event, inputIdentifier) => {
        
        const updatedFormElement = updateObject(this.state.roomForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedRoomForm = updateObject(this.state.roomForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedRoomForm) {
            formIsValid = updatedRoomForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({roomForm: updatedRoomForm, formIsValid: formIsValid});
    }    

    render() {

        const formElementsArray = [];
        for (let key in this.state.roomForm) {
            formElementsArray.push({
                id: key,
                config: this.state.roomForm[key]
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
                <button 
                    onClick={this.roomHandler} 
                    className="green btn-flat white-text"
                    style={{ margin: "0 0 20px 0"}}>
                        Add Room
                </button>
            </form>
        );

        return (
            <div>
                <span>Add Room/Specification Group</span>
                {form}
            </div>
        )
    }
};

export default RoomForm;