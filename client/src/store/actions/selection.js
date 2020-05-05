import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchSelectionsStart = () => {
    return {
        type: actionTypes.FETCH_SELECTIONS_START
    }
};

export const fetchSelectionsSuccess = ( selections ) => {
    return {
        type: actionTypes.FETCH_SELECTIONS_SUCCESS,
        selections: selections
    }
};

export const fetchSelectionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_SELECTIONS_FAIL,
        error: error
    }
};

export const fetchSelections = () => {
    return dispatch => {
        dispatch(fetchSelectionsStart());
        axios.get('/api/products/selections')
            .then (res => {
                // console.log('[fetchSelections] res.data = ', res.data);
                dispatch(fetchSelectionsSuccess(res.data));
            })
            .catch( err => {
                dispatch(fetchSelectionsFail(err));
            });
    };
};

export const fetchFinishTypes = () => {
    return dispatch => {
        axios.get('/api/products/selections/finishTypes')
            .then (res => {
                console.log('[fetchFinishTypes] res = ', res);
                dispatch({ type: actionTypes.FETCH_FINISH_TYPES, payload: res.data });
            })
            .catch( err => {
                console.log(err);
            })
    }
};

export const fetchStockLevels = () => {
    return dispatch => {
        axios.get('/api/products/selections/stocking')
            .then(res => {
                console.log('[fetchStockLevels] res = ', res);
                dispatch({ type: actionTypes.FETCH_STOCK_LEVELS, payload: res.data });
            })
            .catch( err => {
                console.log(err);
            })
    }
};

export const fetchMaterials = () => {
    return dispatch => {
        axios.get('/api/products/selections/materials')
            .then(res => {
                console.log('[fetchMaterials] res.data = ', res.data);
                dispatch({ type: actionTypes.FETCH_MATERIALS, payload: res.data });
            })
            .catch( err => {
                console.log(err);
            })
    }
};