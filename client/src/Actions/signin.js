import{USER_NAME,USER_EMAIL,USER_PASSWORD,SETV_TOKEN} from '../actiontypes';
const axios = require('axios');
/*Firstname and lastname*/
export const registername = (firstname,lastname) => async dispatch => {
    dispatch({
        type:USER_NAME,
        payload:{
            firstname,
            lastname
        }
    })
}
/*Password */
export const enterpassword  = (password) => async dispatch => {
    dispatch({
        type:USER_PASSWORD,
        payload:{
           password
        }
    })
}
export const enteremail = (email) => async dispatch => {
    dispatch({
        type:USER_EMAIL,
        payload:{
            email
        }
    })
}
export const finalregister = (token) => async dispatch => {
    dispatch({
        type:SETV_TOKEN,
        payload:token
    })
}