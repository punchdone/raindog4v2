import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/api/orders')
            .then (res => {
                dispatch(fetchOrdersSuccess(res.data));
            })
            .catch (err => {
                dispatch(fetchOrdersFail(err));
            });
    };
};

export const addOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ADD_ORDER_SUCCESS,
        orderId: id,
        orderDetail: orderData
    };
};

export const addOrderFail = (error) => {
    return {
        type: actionTypes.ADD_ORDER_FAIL,
        error: error
    };
};

export const addOrderStart = () => {
    return {
        type: actionTypes.ADD_ORDER_START
    };
};

export const addOrder = (orderDetails) => {
    return dispatch => {
        console.log('[addOrder] orderDetails = ', orderDetails);
        dispatch(addOrderStart());
        axios.post('/api/orders', orderDetails)
            .then( res => {
                dispatch(addOrderSuccess(res.data._id, orderDetails));
            })
            .catch( error => {
                dispatch(addOrderFail(error));
            });
    };
};

export const removeOrder = ( orderId ) => async dispatch => {
    await axios.delete('/api/orders/'+orderId);
    dispatch({ type: actionTypes.REMOVE_ORDER, payload: orderId });
}

