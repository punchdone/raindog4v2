import React, { Component } from 'react';
import { connect } from 'react-redux';

import { productForm } from '../forms';
// import Input from '../../UI/Input/Input';
import * as actions from '../../store/actions/index';
import { updateObject } from '../../shared/utility';

class ProductForm extends Component {

    state = {
        productForm: productForm,
        loading: true
    };

    async componentDidMount() {
        this.props.onFetchSelections();
        console.log('[componentDidMount] this.props.selections = ', this.props.selections);
        this.props.onFetchMaterials();
        console.log('[componentDidMount] this.props.materials = ', this.props.materials);
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

    render() {

        const cabTypes = this.props.selections;
        console.log('cabTypes = ', cabTypes);
        console.log('this.props = ', this.props);
        console.log('this.props.selections = ', this.props.selections);
        console.log('this.props.materials = ', this.props.materials);

        const formElementsArray = [];

        for(let key in productForm){
            formElementsArray.push({
                id: key,
                config: productForm[key]
            });
        }

        // let form = (
        //     <form onSubmit={this.props.onAddProduct}>
        //         {formElementsArray.map(formElement => (
        //             <Input
        //                 key={formElement.id}
        //                 elementType={formElement.config.elementType}
        //                 elementConfig={formElement.config.elementConfig}
        //                 label={formElement.config.label}
        //                 value={formElement.config.value}
        //                 changed={(event) => this.handleInputChange(event, formElement.id)}
        //              />
        //         ))}
        //         <button
        //             type="submit"
        //             className="green btn-flat white-text"
        //             style={{ margin: '10px 0 10px 0'}}
        //         >
        //             Add Product
        //         </button>
        //     </form>
        )

        return (
            <div>
                <h5>Product Detail Form</h5>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        selections: state.selections.selections,
        materials: state.selections.materials,
        product: state.products.product,
        loading: state.products.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchMaterials: () => dispatch(actions.fetchMaterials()),
        onFetchSelections: () => dispatch(actions.fetchSelections()),
        onFetchProduct: (id) => dispatch(actions.fetchProduct(id)),
        onAddProduct: (productDetails) => dispatch(actions.addProduct(productDetails))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);