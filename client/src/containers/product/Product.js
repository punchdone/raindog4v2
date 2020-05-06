import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import ProductList from './productList';

class Product extends Component {

    componentDidMount() {
        this.props.onFetchProducts();
    }

    newProduct = () => {
        this.props.history.push('/products/new');
    }

    viewProduct = (productId) => {
        this.props.history.push('/products/'+productId+'/edit');
    }

    render() {

        // console.log(this.props.products);

        let list = <Spinner />

        if(!this.props.productsLoading) {
            list =(
                <div>
                    
                    <div className="row">
                        <ProductList 
                            products={this.props.products} 
                            viewProduct={this.viewProduct}
                            removeProduct={this.props.onRemoveProduct} />
                    </div>
                    <div>
                        <button 
                            className="btn-flat green left white-text"
                            onClick={this.newProduct}
                        >
                            New Product
                        </button>
                    </div>
               
                </div>
            )
        }

        return (
            <div>
                <h5>Product Catalog</h5>
                {list}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        products: state.products.products,
        productsLoading: state.products.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => dispatch(actions.fetchProducts()),
        onRemoveProduct: (id) => dispatch(actions.removeProduct(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));