import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import clientsReducer from './clientsReducer';
import samplesReducer from './samplesReducer';
import finishesReducer from './finishesReducer';
import selectionsReducer from './selectionsReducer';
import ordersReducer from './ordersReducer';
import productsReducer from './productsReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
    form: reduxForm,
    clients: clientsReducer,
    samples: samplesReducer,
    finishes: finishesReducer,
    selections: selectionsReducer,
    orders: ordersReducer,
    products: productsReducer,
    projects: projectsReducer
});