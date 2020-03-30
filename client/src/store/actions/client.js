import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchClients = () => async dispatch => {
    const res = await axios.get('/api/projects');
    console.log('[/store/actions/index] fetchClients res.data = ', res.data);
    dispatch({ type: actionTypes.FETCH_CLIENTS, payload: res.data });
};

export const addClient = (values, history) => async dispatch => {
    const res = await axios.post('/api/clients', values);
    history.push('/clients');
};