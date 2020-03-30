import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchSamples = () => async dispatch => {
    const res = await axios.get('api/clients/samples');
    console.log('[/store/actions/index] fetchSamples res.data = ', res.data);
    dispatch({ type: actionTypes.FETCH_SAMPLES, payload: res.data});
};

export const fetchSamplesSuccess = (samples) => {
    return {
        type: actionTypes.FETCH_SAMPLES_SUCCESS,
        samples: samples
    }
};

export const fetchSamplesFail = (error) => {
    return {
        type: actionTypes.FETCH_SAMPLES_FAIL,
        error: error
    }
};

export const fetchSamplesStart = () => {
    return {
        type: actionTypes.FETCH_SAMPLES_START
    };
};

// export const fetchSamples = (clientId) => {
//     return async dispatch => {
//         const samples = await axios.get('/api/clients/:clientId/samples');
//         console.log('[/store/actions/sample] samples = ', samples);
//     }
// }
