import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    products: [],
    loading: false,
    submitting: false
}

const fetchProductsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchProductsSuccess = ( state, action ) => {
    return updateObject( state, {
        products: action.products,
        lodaing: false
    });
};

const fetchProductsFail = ( state, action ) => {
    return updateObject( state, { loading: false });
};

const addProductSuccess = ( state, action ) => {
    const newProduct = updateObject( action.productDetail, { _id: action.productId });
    return updateObject( state, {
        submitting: false,
        products: state.products.concat( newProduct )
    });
};

const addProductStart = ( state, action ) => {
    return updateObject( state, { submitting: true });
};

const addProductFail = ( state, action ) => {
    return updateObject( state, { submitting: false });
};

const removeProduct = ( state, action ) => {
    console.log('[removeProduct] action.productId = ', action.payload);
    const newProductList = state.products.filter(product => product._id !== action.payload);
    return updateObject( state, { products: newProductList });
};

const updateProduct = ( state, action ) => {
    const oldProductList = state.products.filter(product => product._id !== action.productDetails._id);
    const newProductList = {...oldProductList, ...action.productDetails};
    return updateObject( state, { products: newProductList });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart( state, action );
        case actionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess( state, action );
        case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFail( state, action );
        case actionTypes.ADD_PRODUCT_START: return addProductStart( state, action );
        case actionTypes.ADD_PRODUCT_SUCCESS: return addProductSuccess( state, action );
        case actionTypes.ADD_PRODUCT_FAIL: return addProductFail( state, action );
        case actionTypes.REMOVE_PRODUCT: return removeProduct( state, action );
        case actionTypes.UPDATE_PRODUCT: return updateProduct( state, action );
        default: return state;
    };
};

export default reducer;