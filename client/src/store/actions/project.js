import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchProjectsSuccess = ( projects ) => {
    return {
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: projects
    }
};

export const fetchProjectsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PROJECTS_FAIL,
        error: error
    }
};

export const fetchProjectsStart = () => {
    return {
        type: actionTypes.FETCH_PROJECTS_START
    }
};

export const fetchProjects = () => {
    return dispatch => {
        dispatch(fetchProjectsStart());
        axios.get('/api/projects')
            .then (res => {
                dispatch(fetchProjectsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchProjectsFail(err));
            });
    };
};

export const fetchProjectSuccess = ( project ) => {
    return {
        type: actionTypes.FETCH_PROJECT_SUCCESS,
        project: project
    }
};

export const fetchProjectFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PROJECT_FAIL,
        error: error
    }
};

export const fetchProjectStart = () => {
    return { 
        type: actionTypes.FETCH_PROJECT_START 
    }
};

export const fetchProject = (id) => {
    return dispatch => {
        console.log('[fetchProject] id = ', id);
        dispatch(fetchProjectStart());
        axios.get('/api/projects/'+id)
            .then ( res => {
                dispatch(fetchProjectSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchProjectFail(err));
            });
    };
};

export const addProjectSuccess = (id, projectData) => {
    return {
        type: actionTypes.ADD_PROJECT_SUCCESS,
        projectId: id,
        projectDetail: projectData
    };
};

export const addProjectFail = (err) => {
    return {
        type: actionTypes.ADD_PROJECT_FAIL,
        error: err
    };
};

export const addProjectStart = () => {
    return {
        type: actionTypes.ADD_PROJECT_START
    };
};

export const addProject = (projectDetails) => {
    return dispatch => {
        dispatch(addProjectStart());
        console.log('[addProduct] productDetails = ', projectDetails);
        axios.post('/api/projects', projectDetails)
            .then( res => {
                dispatch(addProjectSuccess(res.data._id, projectDetails));
            })
            .catch( error => {
                dispatch(addProjectFail(error));
            });
    };
};

export const removeProject = ( projectId ) => async dispatch => {
    console.log('[removeProject] you made it! payload = ', projectId);
    await axios.delete('/api/projects/'+projectId);
    dispatch({ type: actionTypes.REMOVE_PROJECT, payload: projectId });
};

export const updateProject = (projectDetails) => async dispatch => {
    console.log('[updateProject] projectDetails = ', projectDetails);
    await axios.put('/api/products',+projectDetails._id);
    dispatch({ type: actionTypes.UPDATE_PROJECT, projectDetails});
};