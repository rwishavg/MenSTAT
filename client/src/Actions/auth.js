import {SET_TOKEN,SET_PROFILE,SET_PROFILE_TO_NONE, LOGIN_TOKEN,LOGOUT,SET_VIEWPROFILE_ID} from '../actiontypes';
import axios from 'axios';


export const setusertoken = (token) => async dispatch => {
  localStorage.setItem("token", token);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    };
    const res = await axios.get(
      "/api/v1/users/getcurrentuser",
      config
    );
    console.log(res);
    dispatch({
      type: SET_TOKEN,
      payload: {
        user: res.data.data,
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const setlogintoken = (token) => async dispatch => {
    localStorage.setItem("token", token);
    try {
            const config = {
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
              }
            };
    const res = await axios.get(
      "/api/v1/users/getcurrentuser",
      config
    );    
    await dispatch({
      type:LOGIN_TOKEN,
      payload:res.data.data
    })
  } catch (error) {
    console.log(error);
  }
}
export const setloginprofile = (token) => async dispatch => {
    try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token||localStorage.getItem('token')
            }
          };
      const profile = await axios.get(
        "/api/v1/profile/getcurrentprofile",
        config
      );
          dispatch({
            type: SET_PROFILE,
            payload: profile.data.data
          });
  } catch (error) {
      dispatch({
        type:SET_PROFILE_TO_NONE
      })
  }
}
export const setprofile = (profile) => async dispatch => {
    dispatch({
      type:SET_PROFILE,
      payload:profile
    })
}

export const logout  = () => async dispatch => {
  dispatch({
    type:LOGOUT
  })
}
export const setusrprofileid = (id) => async dispatch => {
  try {
    const config = {
      headers:{
        "x-auth-token":localStorage.getItem('token')
      }
    }
    const url = "/api/v1/profile/getuserprofile/"+id;
    const res = await axios.get(url,config);
  await dispatch({
    type: SET_VIEWPROFILE_ID,
    payload: res.data.data
  });
  } catch (error) {
      console.log(error);
  }

}