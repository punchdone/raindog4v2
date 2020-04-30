import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions';
import ProductList from './productList';

class Product extends Component {

    componentDidMount() {
        this.props.onFetchProducts();
    }

    newProduct = () => {
        this.props.history.push('/products/new');
    }

    render() {

        console.log(this.props.products);

        return (
            <div>
                <h5>Product Catalog</h5>
                <div className="row">
                    <ProductList products={this.props.products} />
                </div>
                <button 
                    className="btn-flat blue white-text"
                    onClick={this.newProduct}
                >
                    New Product
                </button>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        products: state.products.products
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => dispatch(actions.fetchProducts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));