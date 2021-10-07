import axios from 'axios';
import{SET_POST,SET_SINGLE_POST,SET_SINGLE_POST_DATA,SET_POST_DATA,GET_USER_POSTS,SET_EDIT_POST,SET_EDIT_POST_DATA,SET_ALL_POST} from '../actiontypes';



export const setpost = () => async  dispatch => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem('token')
      }
    };
      const res = await axios.get(
        "/api/v1/posts/getfollowpost",
        config
      );
    dispatch({
        type:SET_POST,
        payload:res.data.data
    })
}
export const setallpost = () => async dispatch => {
  const config = {
    headers: {
      "x-auth-token": localStorage.getItem("token")
    }
  };
  const res = await axios.get(
    "/api/v1/posts/getallposts",
    config
  );
  dispatch({
    type: SET_ALL_POST,
    payload: res.data.data
  });
};
export const setsinglepost = (id) =>async dispatch => {
    dispatch({
        type:SET_SINGLE_POST,
        payload:id
    })
}
export const getsinglepost  = (id) => async  dispatch => {
    try {
       const config = {
         headers: {
           "x-auth-token": localStorage.getItem("token")
         }
       };   
       const data = {
         id:id
       }
       const res = await axios.post(
         "/api/v1/posts/getsinglepost",
          data,
          config
       );
       dispatch({
          type:SET_SINGLE_POST_DATA,
          payload:res.data.data
       })
    } catch (error) {
        console.log(error);
    }
}
export const setpostdata = (postdata) => async dispatch => {
  dispatch({
    type:SET_POST_DATA,
    payload:postdata
  })
}
export const getuserposts = () => async dispatch => {
    try {
      const config = {
        headers:{
        "x-auth-token":localStorage.getItem('token')
        }
      }
      const res = await axios.get("/api/v1/posts/getyourposts",config);
      console.log(res);
     await dispatch({
        type:GET_USER_POSTS,
        payload:res.data.data
      })
    } catch (error) {
      console.log(error.response);
    }
}
export const seteditpost = (id) => async dispatch => {
  try {
    const config = {
      headers:{
        "x-auth-token":localStorage.getItem('token')
      }
    }
    const formdata = new FormData();
    formdata.append('id',id);
    const res = await axios.post(
      "/api/v1/posts/getsinglepost",formdata,config
    );
    dispatch({
      type:SET_EDIT_POST,
      payload:res.data.data
    })
    console.log(res.data.data);
  } catch (error) {
    console.log(error.response);
  }
}
export const seteditpostdata = (data) => async dispatch => {

  dispatch({
    type:SET_EDIT_POST_DATA,
    payload:data
  })
}