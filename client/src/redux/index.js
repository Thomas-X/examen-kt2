import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user, { defaultState as userInitialState } from './user';

export default combineReducers({
    form: formReducer,
    user,
});
export const initialState = {
    user: {
        ...userInitialState,
    },
};