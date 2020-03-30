import { FETCH_SAMPLES } from '../actions/actionTypes';

export default function(state=[], action) {
    switch (action.type) {
        case FETCH_SAMPLES:
            return action.payload
        default:
            return state;
    }
}