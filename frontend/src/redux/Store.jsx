import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import registerReducer from './reducer/Register';
import sidebarReducer from './reducer/Sidebar';
import loginReducer from './reducer/Login';
import userReducer from './reducer/Selectuser';
import chatReducer from './reducer/Chat';

const rootreducer = combineReducers({
    login: loginReducer,
    sidebar: sidebarReducer,
    registeruser: registerReducer,
    user: userReducer,
    chat:chatReducer
});

export const store = createStore(rootreducer,
    applyMiddleware(thunk));

export default store;
