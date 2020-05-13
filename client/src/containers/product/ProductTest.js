import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import Select from 'react-select';

import * as actions from '../../store/actions';
// import { productForm } from '../forms';
// import { updateObject } from '../../shared/utility';
// import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

class ProductForm extends Component {

    state = {
        product: this.props.product,
        newProduct: false
    };
    // submitProduct = this.submitProduct.bind(this);
    // updateProduct = this.updateProduct.bind(this);
    // onSubmit = this.onSubmit.bind(this);
    handleSelectChange = this.handleSelectChange.bind(this);
    handleInputChange = this.handleInputChange.bind(this);

    async componentDidMount() {
        await this.props.onFetchSelections();
        const idArr = window.location.pathname.split('/');
        const productId = idArr[2];
        console.log('productId = ', productId);
        if(productId !== 'new'){
            // const product = await this.props.onFetchProduct(productId);
            await this.props.onFetchProduct(productId);
            console.log('[componentDidMount] this.props.product = ', this.props.product);
            // console.log('[componentDidMount] this.state.product = ', product);
            // await this.setState({ product});
            // console.log('[componentDidMount] this.state.product = ', this.state.product);
        } else {
            this.setState({ newProduct: true });
            this.setState({ product: { priceMethod: false }});
        };
        

        
        // const selections = await this.props.onFetchSelections();
        // const products = await this.props.onFetchProducts();
        // console.log('products = ', products);
        // if(window.location.pathname === '/products/new') {
        //     this.setState({ newProduct: true });
        // } else {

        
        // // const products = this.props.products;
        
        // let product = products.filter(product => product._id === productId);
       
        
        // console.log('product = ', product);
        // await this.setState({ product });

        // }
    }

    // handleInputChange = (event, inputIdentifier) => {
    //     console.log('[handleInputChange] inputIdentifier = ', inputIdentifier);
    //     console.log('[handleInputChange] event = ', event);
    //     const updatedFormElement = {};
    //     if(inputIdentifier === 'type') {
    //         event.target = {};
    //         event.target.value = event.value;
    //         // let newProductFormType = {...this.state.productForm.type};
    //         // newProductFormType.value = event.value;
    //         // this.setState({ productForm: { type: newProductFormType }});
    //     };
    //         // } else {
    //         updatedFormElement = updateObject(this.state.productForm[inputIdentifier], {
    //             value: event.target.value
    //         });
    //     // };
    //     console.log('[handleInputChange] this.state.productForm[inputIdentifier].value = ', this.state.productForm[inputIdentifier].value);
    //     const updatedProductForm = updateObject(this.state.productForm, {
    //         [inputIdentifier]: updatedFormElement
    //     });
    //     let formIsValid = true;
    //     for (let inputIdentifier in updatedProductForm) {
    //         formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
    //     }
    //     this.setState({productForm: updatedProductForm, formIsValid: formIsValid});
    //     // console.log('[handleInputChange] updatedFinishForm = ', updatedFinishForm);
    // }

    // updateProduct(event) {
    //     event.preventDefault();
    //     console.log('[updateProduct] event = ', event);
    //     // console.log('[updateProduct] this.state.product = ', this.state.product);
    //     // this.props.onUpdateProduct(this.state.)
    //     // this.props.history.push('/products');
    // }

    // submitProduct(event) {
    //     event.preventDefault();
    //     console.log('[submitProduct] event = ', event);
    //     const formData = {};
    //     for (let formElementIdentifier in this.state.productForm) {
    //         console.log('[submitProduct] formElementIdentifier = ', formElementIdentifier);
    //         formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
    //     };
    //     console.log('[submitProduct] formData = ', formData);
    //     console.log('[submitProduct] this.state = ', this.state);
    //     // this.props.onAddProduct(formData);
    //     // this.props.history.push('/products');

    //     // const updateForm = {...this.state.productForm};
    //     // console.log('[submitProduct] before updateForm = ', updateForm);
    //     // updateForm.type.value = null;
    //     // updateForm.configuration.value = '';
    //     // updateForm.title.value = '';
    //     // this.setState({ productForm: updateForm });
    //     // console.log('[submitProduct] after updateForm = ', updateForm)
    // }

    onSubmit = async e => {
        e.preventDefault();
        console.log('[onSubmit] this.state.product = ', this.state.product);
        console.log('[onSubmit] product.images = ', this.state.product.images);
        // console.log('[onSubmit] this.state.file = ', this.state.file);
        const formData = new FormData();
        formData.append('type', this.state.product.type);
        formData.append('configuration', this.state.product.configuration);
        formData.append('title', this.state.product.title);
        await formData.append('images', this.state.product.images);

        // const formData = new FormData();
        // formData.append('type', this.state.cabType);
        // formData.append('file', this.state.file);
        console.log('[onSumbit] formData = ', formData);
        this.props.onAddProduct(formData);
        this.props.history.push('/products');
        
    }

    onFileChange = e => {
        console.log('[onFileChange] e = ', e);
        let product = {...this.state.product};
        product.images = e.target.files[0];
        // product.fileName = e.target.files[0].name;
        // this.setState({ file: e.target.files[0]});
        // this.setState({ fileName: e.target.files[0].name });
        this.setState({ product });
    }

    handleSelectChange(val) {
        console.log('[handleChange] val = ', val);
        let product = {...this.state.product};
        product.type = val.value;
        this.setState({ product });
        // console.log('[handleChange] this.state.selectedValue = ', this.state.selectedValue);
        // this.setState(
        //     { selectedValue }, 
        //     () => console.log('Option selected: ', this.state.selectedValue )
        // );
    };

    handleInputChange(e) {
        e.preventDefault();
        console.log('[handleInputChange] e.target = ', e.target);
        let product = {...this.state.product};
        product[e.target.name] = e.target.value;
        console.log('[handleInputChange] e.target.value = ', e.target.value);
        this.setState({ product });
    };

    render() {

        console.log('this.props.product = ', this.props.product);
        console.log('this.props.selections = ', this.props.selections);
        console.log('this.props.productLoading = ', this.props.productLoading);
        console.log('this.props.selectionsLoading = ', this.props.selectionsLoading);
        console.log('this.state = ', this.state);
        

        
        // let productForm = {...this.state.productForm};

        let form = <Spinner />;
        let price = null;

        // products = this.props.products;
        // console.log('products = ', products);
        // if (products) {
        //     product = products.filter(product => product._id === productId);
        //     console.log('product = ', product);
        // }
        
        // console.log('productForm = ', productForm);
        // console.log('this.props.selections = ', this.props.selections);

        const cabTypes = this.props.selections.filter(selection => selection.type === 'cabType');
        console.log('cabTypes = ', cabTypes);
        const cabTypeArr = [];
        for (let key in cabTypes) {
            cabTypeArr.push({
                value: cabTypes[key]._id,
                label: cabTypes[key].selection
            });
        };
        let elementPosition = ''
        if(this.props.product) {
            elementPosition = cabTypeArr.map(item => {return item.value}).indexOf(this.props.product.type);
            console.log('elementPostion = ', elementPosition);
        }
        
        // productForm.type.elementConfig.options = cabTypeArr;

        // const formElementsArray = [];

        // if (!this.props.selectionsLoading && !this.props.productLoading && !this.state.newProduct) {
            // console.log('this.props.product.type = ', this.props.product.type);
            
            // console.log('[loading false] this.props.product = ', this.props.product);
            // this.setState({ products: this.props.product });
            // console.log('[loading false] this.state.product = ', this.state.product);
            // form = (
            //     <form onSubmit={this.updateProduct}>
            //         <p>ID: {this.props.product._id}</p>
            //         <p>Option default value: {this.props.product.type}</p>
            //         <label>Cabinet Type</label>
            //         <Select 
            //             className="basic-single"
            //             classNamePrefix="select"
            //             defaultValue={cabTypeArr[elementPosition]}
            //             name="type"
            //             placeholder="Cabinet Type"
            //             options={cabTypeArr}
            //             onChange={this.handleChange}
            //          />
            //          <label>Configuration</label>
            //          <input 
            //             name="configuration"
            //             type="text" placeholder="Configuration Code"
            //             value={this.props.product.configuration}
            //             onChange={this.handleSelectChange}
            //          />
            //          <label>Description</label>
            //          <input
            //             type="text"
            //             name="title"
            //             placeholder="Product Description"
            //             value={this.props.product.title}
            //             onChange={this.handleChange}
            //          />
            //          <p>This is a thing, because a thing is a thing.</p>
            //          <form action="#">
            //             <div className="field-field input-field">
            //                 <div className="btn">
            //                     <span>File</span>
            //                     <input type="file" onChange={this.onFileChange} multiple />
            //                 </div>
            //                 <div className="file-path-wrapper">
            //                     <input className="file-path validate" type="text" value={this.state.fileName} placeholder="Upload one or more files" />
            //                 </div>
            //             </div>
            //          </form>
            //          <label>Pricing Method</label>
            //          <div className="switch" style={{ margin: '0 0 10px 0 '}}>
            //              <label>
            //                  Levels
            //                  <input type="checkbox" />
            //                  <span className="lever"></span>
            //                  Material
            //              </label>
            //          </div>
            //          <button
            //             className="btn-flat green white-text"
            //             type="submit">
            //                 Update
            //         </button>
            //     </form>

            //     // <form onSubmit={this.submitProduct}>
            //     //     {formElementsArray.map(formElement => (
            //     //         <Input
            //     //             key={formElement.id}
            //     //             elementType={formElement.config.elementType}
            //     //             elementConfig={formElement.config.elementConfig}
            //     //             label={formElement.config.label}
            //     //             value={formElement.config.value}
            //     //             changed={(event) => this.handleInputChange(event, formElement.id)}
            //     //          />
            //     //     ))}
            //     //     <button
            //     //         type="submit"
            //     //         className="green btn-flat white-text"
            //     //         style={{ margin: '10px 0 10px 0'}}
            //     //     >
            //     //         Add Product
            //     //     </button>
            //     // </form>

            // );
            // defaultSelection = cabTypeArr[1].value;
            
        // };

        if((!this.props.productLoading || this.state.newProduct) && !this.props.selectionsLoading) {
            form = (
                <form onSubmit={this.onSubmit}>
                    <label>Cabinet Type</label>
                    <Select 
                        className="basic-single"
                        classNamePrefix="select"
                        name="type"
                        placeholder="Cabinet Type"
                        options={cabTypeArr}
                        onChange={this.handleSelectChange}
                     />
                     <label>Configuration</label>
                     <input 
                        name="configuration"
                        type="text" placeholder="Configuration Code"
                        onChange={this.handleInputChange}
                     />
                     <label>Description</label>
                     <input
                        type="text"
                        name="title"
                        placeholder="Product Description"
                        onChange={this.handleInputChange}
                     />
        
                        <div className="file-field input-field">
                            <div className="btn green">
                                <span>File</span>
                                <input 
                                    type="file" 
                                    accept="images/*"
                                    name="images"
                                    onChange={this.onFileChange} 
                                    multiple />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                            </div>
                        </div>
                     
                     <label>Pricing Method</label>
                     <div 
                        className="switch" 
                        style={{ margin: '10px 0 30px 0 '}}>
                         <label>
                             Levels
                             <input
                                name="priceMethod"
                                type="checkbox"
                                onChange={this.handleInputChange} />
                             <span className="lever"></span>
                             Material
                         </label>
                     </div>
                     <Link 
                        to="/products" 
                        className="red btn-flat white-text left"
                    >
                        Cancel
                    </Link>
                     <button
                        className="btn-flat green right white-text"
                        type="submit">
                            Submit
                    </button>
                </form>
            )
        };

        if(!this.props.productLoading && !this.props.product.priceMethod) {
            price = (
                <table>
                    <thead>
                        <tr>
                            <th>Paint</th>
                            <th>Cherry</th>
                            <th>Maple</th>
                            <th>Alder, Clear</th>
                            <th>Alder, Knotty</th>
                            <th>TFL</th>
                            <th>Acrylic</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        } else if (!this.props.productLoading && this.state.product.priceMethod) {
            price = (
                <table>
                    <thead>
                        <tr>
                            <th>Level 1</th>
                            <th>Level 2</th>
                            <th>Level 3</th>
                            <th>Level 4</th>
                            <th>Level 5</th>
                            <th>Level 6</th>
                            <th>Level 7</th>
                            <th>Level 8</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                            <td>
                                <input type="number" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        };


        
        // if (product) {
        //     for(let key in productForm){
        //         // console.log(key);
        //         // console.log(productForm[key].value);
        //         // console.log(product[key]);
        //         productForm[key].value = product[key];
        //         // console.log(product[0][key]);
        //         formElementsArray.push({
        //             id: key,
        //             config: productForm[key]
        //         });
        //     };
        // }
        

        // console.log('formElementsArray = ', formElementsArray);

        

        // const selectedLabel = 'For testing purposes';
        // // const selectedValue = '5eab1dfdd64c06145fd78722';
        // const { selectedValue } = this.state;
        // console.log('selectedValue = ', selectedValue);
        // console.log('this.state.selectedValue = ', this.state.selectedValue);

        return (
            <div>
                <h5>Product Page Test!</h5>
                {form}
                {price}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        selections: state.selections.selections,
        // products: state.products.products,
        product: state.products.product,
        productLoading: state.products.loading,
        selectionsLoading: state.selections.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelections: () => dispatch(actions.fetchSelections()),
        onFetchProduct: (id) => dispatch(actions.fetchProduct(id)),
        // onFetchProducts: () => dispatch(actions.fetchProducts()),
        onAddProduct: (productDetails) => dispatch(actions.addProduct(productDetails)),
        onUpdateProduct: (productDetails) => dispatch(actions.updateProduct(productDetails))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductForm));