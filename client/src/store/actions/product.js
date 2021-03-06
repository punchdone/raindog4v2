import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchProductsSuccess = ( products ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products
    }
};

export const fetchProductsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error
    }
};

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
};

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());
        axios.get('/api/products')
            .then (res => {
                dispatch(fetchProductsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchProductsFail(err));
            });
    };
};

export const fetchProductSuccess = ( product ) => {
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        product: product
    }
};

export const fetchProductFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL,
        error: error
    }
};

export const fetchProductStart = () => {
    return { 
        type: actionTypes.FETCH_PRODUCT_START 
    }
};

export const fetchProduct = (id) => {
    return dispatch => {
        console.log('[fetchProduct] id = ', id);
        dispatch(fetchProductStart());
        axios.get('/api/products/'+id)
            .then ( res => {
                dispatch(fetchProductSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchProductFail(err));
            });
    };
};

export const addProductSuccess = (id, productData) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        productId: id,
        productDetail: productData
    };
};

export const addProductFail = (err) => {
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
        error: err
    };
};

export const addProductStart = () => {
    return {
        type: actionTypes.ADD_PRODUCT_START
    };
};

export const addProduct = (productDetails) => {
    return dispatch => {
        dispatch(addProductStart());
        console.log('[addProduct] productDetails = ', productDetails);
        axios.post('/api/products', productDetails, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            // onUploadProgress: progressEvent => {
            //     setUploadPercentage(
            //         parseInt(
            //             Math.round((progressEvent.loaded * 100) / progressEvent.total)
            //         )
            //     );
            // setTimeout(() => setUploadPercentage(0), 10000);
            // }
        })
            .then( res => {
                dispatch(addProductSuccess(res.data._id, productDetails));
            })
            .catch( error => {
                dispatch(addProductFail(error));
            });
    };
};

export const removeProduct = ( productId ) => async dispatch => {
    console.log('[removeProduct] you made it! payload = ', productId);
    await axios.delete('/api/products/'+productId);
    dispatch({ type: actionTypes.REMOVE_PRODUCT, payload: productId });
};

export const updateProduct = (productDetails) => async dispatch => {
    console.log('[updateProduct] productDetails = ', productDetails);
    await axios.put('/api/products',+productDetails._id);
    dispatch({ type: actionTypes.UPDATE_PRODUCT, productDetails});
};