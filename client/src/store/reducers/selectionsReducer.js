import {
    FETCH_FINISH_TYPES,
    FETCH_STOCK_LEVELS,
    FETCH_MATERIALS,
    FETCH_SELECTIONS
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    selections: [],
    finishTypes: [],
    stockLevels: [],
    materials: []
};

export default function ( state = initialState, action) {
    switch(action.type) {
        case FETCH_SELECTIONS:
            console.log('[FETCH_SELECTIONS] action.payload = ', action.payload);
            return updateObject( state, { selections: action.payload });
        case FETCH_FINISH_TYPES:
            console.log('[FETCH_FINISH_TYPES] action.payload = ', action.payload);
            return updateObject( state, { finishTypes: action.payload });
        case FETCH_STOCK_LEVELS:
            console.log('[FETCH_STOCK_LEVELS] action.payload = ', action.payload);
            return updateObject( state, { stockLevels: action.payload });
        case FETCH_MATERIALS:
            console.log('[FETCH_MATERIALS] action.payload = ', action.payload);
            return updateObject( state, { materials: action.payload });
        default:
            return state;
    }
};