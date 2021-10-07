import {USER_NAME,USER_EMAIL,USER_PASSWORD,SETV_TOKEN} from '../actiontypes';

const initialstate = {
        firstname:"",
        lastname:"",
        password:"",
        email:"",
        vtoken:""
}

export default function(state = initialstate,action){
        const {payload,type} = action;

        switch (type) {
            case USER_NAME:{
                return{
                    ...state,
                    firstname:payload.firstname,
                    lastname:payload.lastname
                }
            }
            case USER_PASSWORD:{
                return{
                    ...state,
                    password:payload.password
                }
            }
            case USER_EMAIL:{
                return{
                    ...state,
                    email:payload.email
                }
            }
            case SETV_TOKEN:{
                return {
                    ...state,
                    vtoken:payload
                }
            }
        
            default:
                return state;
        }
}