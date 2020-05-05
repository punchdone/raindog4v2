import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    selections: [],
    finishTypes: [],
    stockLevels: [],
    materials: [],
    loading: false
};

const fetchSelectionsStart = ( state, action ) => {
    return updateObject( state, { loading: true} );
};

const fetchSelectionsSuccess = ( state, action ) => {
    return updateObject( state, {
        selections: action.selections,
        loading: false
    });
};

const fetchSelectionsFail = ( state, action ) => {
    return updateObject( state, { loading: false});
};

const fetchFinishTypes = ( state, action ) => {
    return updateObject( state, { finishTypes: action.payload });
};

const fetchStockLevels = ( state, action ) => {
    return updateObject( state, { stockLevels: action.payload })
};

const fetchMaterials = ( state, action ) => {
    return updateObject( state, { materials: action.payload});
};

const reducer =  ( state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SELECTIONS_START: return fetchSelectionsStart( state, action );
        case actionTypes.FETCH_SELECTIONS_SUCCESS: return fetchSelectionsSuccess( state, action );
        case actionTypes.FETCH_SELECTIONS_FAIL: return fetchSelectionsFail( state, action );
        case actionTypes.FETCH_FINISH_TYPES: return fetchFinishTypes( state, action );
        case actionTypes.FETCH_STOCK_LEVELS: return fetchStockLevels( state, action );
        case actionTypes.FETCH_MATERIALS: return fetchMaterials( state, action );
        default: return state;
    }
};

export default reducer;