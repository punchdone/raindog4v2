import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    finishes: [],
    loading: false,
    submitting: false
};

const fetchFinishesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchFinishesSuccess = (state, action ) => {
    return updateObject( state, {
        finishes: action.finishes,
        loading: false
    } );
};

const fetchFinishesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const addFinishStart = ( state, action ) => {
    console.log('[addFinishStart] action = ', action);
    return updateObject( state, { submitting: true });
};

const addFinishSuccess = ( state , action ) => {
    console.log('[addFinishSuccess] action = ', action);
    const newFinish = updateObject( action.finishDetail, { _id: action.finishId });
    return updateObject( state, {
        submitting: false,
        finishes: state.finishes.concat( newFinish )
    });
};

const addFinishFail = ( state, action ) => {
    console.log('[addFinishFail] action = ', action);
    return updateObject( state, { submitting: false } );
};

const removeFinish = ( state, action ) => {
    const newFinishList = state.finishes.filter(finish => finish._id !== action.finishId);
    return updateObject( state, { finishes: newFinishList });
};

const addFinishMaterial = ( state, action ) => {
    let updateArr = [...state.finishes];
    console.log('[addFinishMaterial] action = ', action);
    const elementPosition = state.finishes.map(finish => { return finish._id}).indexOf(action.finishId);
    const materialsArr = state.finishes[elementPosition].materials;
    const newMaterials = materialsArr.concat( action.materialDetail );
    updateArr[elementPosition].materials = newMaterials;
    console.log('[addFinishMaterial] elementPosition = ', elementPosition);
    console.log('[addFinishMaterials] newMaterials = ', newMaterials);
    console.log('[addFinishMaterial] state = ', state);
    return updateObject( state, {finishes: updateArr });
};

const removeFinishMaterial = ( state, action ) => {
    let updateArr = [...state.finishes];
    const elementPosition = state.finishes.map(finish => { return finish._id}).indexOf(action.finishId);
    const materialsArr = state.finishes[elementPosition].materials;
    const newMaterials = materialsArr.filter(material => material._id !== action.materialId);
    updateArr[elementPosition].materials = newMaterials;
    return updateObject( state, { finishes: updateArr });
}; 

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FINISHES_START: return fetchFinishesStart( state, action );
        case actionTypes.FETCH_FINISHES_SUCCESS: return fetchFinishesSuccess( state, action );
        case actionTypes.FETCH_FINISHES_FAIL: return fetchFinishesFail( state, action );
        case actionTypes.ADD_FINISH_START: return addFinishStart( state, action );
        case actionTypes.ADD_FINISH_SUCCESS: return addFinishSuccess( state, action );
        case actionTypes.ADD_FINISH_FAIL: return addFinishFail( state, action ); 
        case actionTypes.REMOVE_FINISH: return removeFinish( state, action );
        case actionTypes.REMOVE_FINISH_MATERIAL: return removeFinishMaterial( state, action );
        case actionTypes.ADD_FINISH_MATERIAL: return addFinishMaterial( state, action );
        default: return state;
    };
};

export default reducer;