import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import clientsReducer from './clientsReducer';
import samplesReducer from './samplesReducer';

export default combineReducers({
    form: reduxForm,
    clients: clientsReducer,
    samples: samplesReducer
});