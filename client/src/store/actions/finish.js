import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchFinishesSuccess = ( finishes ) => {
    return {
        type: actionTypes.FETCH_FINISHES_SUCCESS,
        finishes: finishes
    };
};

export const fetchFinishesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FINISHES_FAIL,
        error: error
    };
};

export const fetchFinishesStart = () => {
    return {
        type: actionTypes.FETCH_FINISHES_START
    };
};

export const fetchFinishes = () => {
    return dispatch => {
        dispatch(fetchFinishesStart());
        axios.get('/api/products/selections/finishes')
            .then (res => {
                console.log('[fetchFinishes] response = ', res);
                dispatch(fetchFinishesSuccess(res.data));
            })
            .catch( err => {
                dispatch(fetchFinishesFail(err));
            });
    };
};

export const addFinishSuccess = (id, finishData) => {
    return {
        type: actionTypes.ADD_FINISH_SUCCESS,
        finishId: id,
        finishDetail: finishData
    };
};

export const addFinishFail = (error) => {
    return {
        type: actionTypes.ADD_FINISH_FAIL,
        error: error
    };
};

export const addFinishStart = () => {
    return {
        type: actionTypes.ADD_FINISH_START
    };
};

export const addFinish = ( finishDetails ) => {
    // console.log('[addFinish] finishDetails = ', finishDetails);
    return dispatch => {
        dispatch(addFinishStart());
        axios.post('/api/products/selections/finishes', finishDetails)
            .then( res => {
                dispatch(addFinishSuccess(res.data._id, finishDetails));
            })
            .catch( error => {
                dispatch(addFinishFail(error));
            });
    };
};

export const removeFinish = ( finishId ) => async dispatch => {
    await axios.delete('/api/products/selections/finishes/'+finishId);
    dispatch({ type: actionTypes.REMOVE_FINISH, payload: finishId });
};

export const addFinishMaterial = (finishId, material) => async dispatch => {
    const res = await axios.put('/api/products/selections/finishes/'+finishId+'/materials', material);
    console.log('[addFinishMaterial] res = ', res);
    dispatch({ type: actionTypes.ADD_FINISH_MATERIAL, finishId, materialDetail: res.data });
};

export const removeFinishMaterial = (finishId, materialId) => async dispatch => {
    console.log('[removeFinishMaterial] finishId = ', finishId);
    console.log('[removeFinishMaterial] materialId = ', materialId);
    await axios.delete('/api/products/selections/finishes/'+finishId+'/materials/'+materialId);
    dispatch({ type: actionTypes.REMOVE_FINISH_MATERIAL, finishId, materialId });
};