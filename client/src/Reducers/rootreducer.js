import {combineReducers} from 'redux';
import signin from './signin';
import auth from './auth';
import post from './post';

export default combineReducers({
    signin,auth,post
});