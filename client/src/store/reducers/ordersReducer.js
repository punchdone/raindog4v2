import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    submitting: false
};

const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject (state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false });
};

const addOrderStart = ( state, action ) => {
    return updateObject( state, { submitting: true });
};

const addOrderSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderDetail, { _id: action.orderId });
    return updateObject( state, {
        submitting: false,
        orders: state.orders.concat( newOrder )
    });
};

const addOrderFail = ( state, action ) => {
    return updateObject( state, { submitting: false });
};

const removeOrder = ( state, action ) => {
    const newOrderList = state.orders.filter(order => order._id !== action.orderId);
    return updateObject (state, { orders: newOrderList });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
        case actionTypes.ADD_ORDER_START: return addOrderStart( state, action );
        case actionTypes.ADD_ORDER_SUCCESS: return addOrderSuccess( state, action );
        case actionTypes.ADD_ORDER_FAIL: return addOrderFail( state, action );
        case actionTypes.REMOVE_ORDER: return removeOrder( state, action );
        default: return state;
    };
};

export default reducer;