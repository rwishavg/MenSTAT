import {SET_TOKEN,SET_PROFILE,SET_PROFILE_TO_NONE,LOGIN_TOKEN,LOGOUT,SET_VIEWPROFILE_ID} from '../actiontypes';
const initialstate = {
    token:localStorage.getItem('token'),
    isAuthenticated:localStorage.getItem('isAuthenticated'),
    user:localStorage.getItem('user'),
    profile:localStorage.getItem('profile'),
    viewprofile:""
}

export default function(state=initialstate,action){
    const {type,payload} = action;

    switch (type) {
        case SET_TOKEN:
            localStorage.setItem('isAuthenticated',true);
            return {
              ...state,
              token: localStorage.getItem("token"),
              user: payload.user,
              isAuthenticated:true,
            };
        case SET_PROFILE:
            localStorage.setItem('profile',JSON.stringify(payload))
            return{
                ...state,
                profile:payload
            }
        case LOGIN_TOKEN:
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem('user',JSON.stringify(payload));
            return {
              ...state,
              token:localStorage.getItem('token'),
              user: payload,
              isAuthenticated: true
            };
        case SET_PROFILE_TO_NONE:
            return{
                ...state,
                profile:{}
            }
        case LOGOUT:
            localStorage.setItem('isAuthenticated',false);
            localStorage.setItem('profile',null);
            localStorage.setItem('user',null);
            localStorage.setItem('token',null);
            return{
                isAuthenticated:false,
                user:{},
                profile:{},
                token:null     
            }
        case SET_VIEWPROFILE_ID:{
            localStorage.setItem("viewuserprofile",JSON.stringify(payload))
            return {
              ...state,
              viewprofile: localStorage.getItem("viewuserprofile")
            };
        }
        default: 
            return state;
    }
}