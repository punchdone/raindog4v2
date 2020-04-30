import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import { productForm } from '../forms';
import { updateObject } from '../../shared/utility';
import Input from '../../UI/Input/Input';

class ProductForm extends Component {

    state = {
        productForm: productForm
    };

    async componentDidMount() {
        await this.props.onFetchSelections();
    }

    handleInputChange = (event, inputIdentifier) => {
        // console.log('[handleInputChange] inputIdentifier = ', inputIdentifier);
        // console.log('[handleInputChange] event = ', event);
        if(inputIdentifier === 'type') {
            event.target = {};
            event.target.value = event.value;
        }
        const updatedFormElement = updateObject(this.state.productForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedProductForm = updateObject(this.state.productForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedProductForm) {
            formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({productForm: updatedProductForm, formIsValid: formIsValid});
        // console.log('[handleInputChange] updatedFinishForm = ', updatedFinishForm);
    }

    submitProduct(val) {
        console.log('submitProduct val = ', val);
        alert('stop');
    }

    render() {

        let productForm = {...this.state.productForm};
        console.log('productForm = ', productForm);
        console.log('this.props.selections = ', this.props.selections);
        const cabTypes = this.props.selections.filter(selection => selection.type === 'cabType');
        console.log('cabTypes = ', cabTypes);
        const cabTypeArr = [];
        for (let key in cabTypes) {
            cabTypeArr.push({
                value: cabTypes[key]._id,
                label: cabTypes[key].selection
            });
        };
        productForm.type.elementConfig.options = cabTypeArr;


        const formElementsArray = [];

        for(let key in productForm){
            formElementsArray.push({
                id: key,
                config: productForm[key]
            });
        }

        let form = (
            <form onSubmit={this.submitProduct}>
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
                    style={{ margin: '10px 0 10px 0'}}
                >
                    Add Product
                </button>
            </form>
        )

        return (
            <div>
                <h5>Product Page Test!</h5>
                {form}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        selections: state.selections.selections
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelections: () => dispatch(actions.fetchSelections()),
        onAddProduct: (productDetails) => dispatch(actions.addProduct(productDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);