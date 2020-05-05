import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    projects: [],
    loading: true,
    submitting: false
}

const fetchProjectsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchProjectsSuccess = ( state, action ) => {
    return updateObject( state, {
        projects: action.projects,
        loading: false
    });
};

const fetchProjectsFail = ( state, action ) => {
    return updateObject( state, { loading: false });
};

const fetchProjectStart = ( state, action ) => {
    return updateObject ( state, { loadig: true } );
};

const fetchProjectSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        project: action.project
    });
};

const fetchProjectFail = ( state, action ) => {
    return updateObject( state, { loading: false });
};

const addProjectSuccess = ( state, action ) => {
    const newProject = updateObject( action.projectDetail, { _id: action.projectId });
    return updateObject( state, {
        submitting: false,
        projects: state.projects.concat( newProject )
    });
};

const addProjectStart = ( state, action ) => {
    return updateObject( state, { submitting: true });
};

const addProjectFail = ( state, action ) => {
    return updateObject( state, { submitting: false });
};

const removeProject = ( state, action ) => {
    console.log('[removeProject] action.projectId = ', action.payload);
    const newProjectList = state.projects.filter(project => project._id !== action.payload);
    return updateObject( state, { projects: newProjectList });
};

const updateProject = ( state, action ) => {
    const oldProjectList = state.projects.filter(project => project._id !== action.projectDetails._id);
    const newProjectList = {...oldProjectList, ...action.projectDetails};
    return updateObject( state, { projects: newProjectList });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_PROJECTS_START: return fetchProjectsStart( state, action );
        case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess( state, action );
        case actionTypes.FETCH_PROJECTS_FAIL: return fetchProjectsFail( state, action );
        case actionTypes.FETCH_PROJECT_START: return fetchProjectStart( state, action );
        case actionTypes.FETCH_PROJECT_SUCCESS: return fetchProjectSuccess( state, action );
        case actionTypes.FETCH_PROJECT_FAIL: return fetchProjectFail( state, action );
        case actionTypes.ADD_PROJECT_START: return addProjectStart( state, action );
        case actionTypes.ADD_PROJECT_SUCCESS: return addProjectSuccess( state, action );
        case actionTypes.ADD_PROJECT_FAIL: return addProjectFail( state, action );
        case actionTypes.REMOVE_PROJECT: return removeProject( state, action );
        case actionTypes.UPDATE_PROJECT: return updateProject( state, action );
        default: return state;  
    };
};

export default reducer;