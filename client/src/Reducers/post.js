import {SET_POST,SET_SINGLE_POST,SET_POST_DATA,SET_SINGLE_POST_DATA,SET_POST_HEADING, GET_USER_POSTS,SET_EDIT_POST,SET_EDIT_POST_DATA,SET_ALL_POST} from '../actiontypes';
const initialstate = {
    posts:{},
    allposts:{},
    post:localStorage.getItem('postid'),
    postdata:{},
    currnetuserposts:{},
    singlepostdata:"",
    editpost:{},
    editpostdata:"",
    counter:false,
    expcounter:false,
    usercounter:false
}
export default function(state = initialstate, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_POST:
      return{
          ...state,
          posts:payload,
          counter:true
      }
    case SET_SINGLE_POST:{
        localStorage.setItem("postid", payload);
        return {
            ...state,
            post:payload
        }
    }
    case SET_ALL_POST:{
      return{
        ...state,
        allposts:payload,
        expcounter:true
      }
    }
    case SET_SINGLE_POST_DATA:{
        return{
            ...state,
            postdata:payload
        }
    }
    case SET_POST_DATA:{
      return{
        ...state,
        singlepostdata:payload
      }
    }
    case GET_USER_POSTS:{
      return{
        ...state,
        currnetuserposts:payload,
        usercounter:true
      }
    }
    case SET_EDIT_POST:{
      return{
        ...state,
        editpost:payload
      }
    }
    case SET_EDIT_POST_DATA:{
      return{
        ...state,
        editpostdata:payload
      }
    }

    default:
      return {
        ...state
      };
  }
}