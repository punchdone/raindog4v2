import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import * as actions from '../../store/actions';
import { productForm } from '../forms';
import { updateObject } from '../../shared/utility';
import Input from '../../UI/Input/Input';

class ProductForm extends Component {

    state = {
        productForm: productForm,
        newProduct: false
    };
    submitProduct = this.submitProduct.bind(this);

    async componentDidMount() {
        await this.props.onFetchSelections();
        await this.props.onFetchProducts();
        if(window.location.pathname === '/products/new') {
            this.setState({ newProduct: true });
        } else {
            this.props.onFetchSelections();
        }
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

    updateProject(event) {
        event.preventDefault();
        console.log('[updateProduct] this.state.product = ', this.state.product);
        // this.props.onUpdateProduct(this.state.)
        this.props.history.push('/products');
    }

    submitProduct(event) {
        event.preventDefault();
        console.log('[submitProduct] event = ', event);
        const formData = {};
        for (let formElementIdentifier in this.state.productForm) {
            formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
        }
        this.props.onAddProduct(formData);
        this.props.history.push('/products');
        // const updateForm = {...this.state.productForm};
        // console.log('[submitProduct] before updateForm = ', updateForm);
        // updateForm.type.value = null;
        // updateForm.configuration.value = '';
        // updateForm.title.value = '';
        // this.setState({ productForm: updateForm });
        // console.log('[submitProduct] after updateForm = ', updateForm)
    }

    render() {

        const products = this.props.products;
        let product = []
        const idArr = window.location.pathname.split('/');
        const productId = idArr[2];
        if(productId !== 'new') {
            product = products.filter(product => product._id === productId)[0];
            // const { type } = product;
            // console.log('product.type = ', product[type]);
        };
       
        
        let productForm = {...this.state.productForm};
        // console.log('productForm = ', productForm);
        // console.log('this.props.selections = ', this.props.selections);
        const cabTypes = this.props.selections.filter(selection => selection.type === 'cabType');
        // console.log('cabTypes = ', cabTypes);
        const cabTypeArr = [];
        for (let key in cabTypes) {
            cabTypeArr.push({
                value: cabTypes[key]._id,
                label: cabTypes[key].selection
            });
        };
        productForm.type.elementConfig.options = cabTypeArr;


        const formElementsArray = [];
        if (product) {
            for(let key in productForm){
                console.log(key);
                console.log(productForm[key].value);
                console.log(product[key]);
                productForm[key].value = product[key];
                // console.log(product[0][key]);
                formElementsArray.push({
                    id: key,
                    config: productForm[key]
                });
            };
        }
        

        console.log('formElementsArray = ', formElementsArray);

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

        const selected = 'W';
        // 5eab1dfdd64c06145fd78722

        return (
            <div>
                <h5>Product Page Test!</h5>
                <label>Test A</label>
                <Select 
                    value='Base'
                    onChange={this.handleChange}
                    options={cabTypeArr}
                    selectedValue='5eab1dfdd64c06145fd78722'
                 />
                 <br />
                 <label>Test B</label>
                 <select value={selected}>
                     <option value="B">Base</option>
                     <option value="W">Wall</option>
                     <option value="T">Tall</option>
                 </select>
                {form}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        selections: state.selections.selections,
        products: state.products.products
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelections: () => dispatch(actions.fetchSelections()),
        onFetchProducts: () => dispatch(actions.fetchProducts()),
        onAddProduct: (productDetails) => dispatch(actions.addProduct(productDetails)),
        onUpdateProduct: (productDetails) => dispatch(actions.updateProduct(productDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);