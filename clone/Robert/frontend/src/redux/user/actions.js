/*
 * @file: actions.js
 * @description:  Actions for user reducer
 */

import { LOGIN, UPDATE_PROFILE, USER_DATA } from "./constants";
import axios from "axios";
import localIP from "../../config/APIurl";
export const login = data => ({ type: LOGIN, data: data }); // login action.
export const updateProfile = data => ({ type: UPDATE_PROFILE }); // logout action to update user profile.
export const getUserDetails = data => ({ type: USER_DATA, data: data });

/********* API to login data ************/
export const loginComplete = data => {
  const headers = {
    "Content-Type": "application/json"
  };
  let url = localIP.concat("/signin");
  return dispatch => {
    return axios
      .post(url, data, headers)
      .then(data => {
        console.log(data, "hello");
        dispatch(login(data));
      })
      .catch(function(error) {
        dispatch(login(null));
      });
  };
};

/********* API to logout data ************/
export const logout = () => {
  return dispatch => {
    dispatch(login(null));
    dispatch(getUserDetails(null));
  };
};

/********* API to getuserData ************/
export const getuserData = data => {
  let url = localIP.concat("/");
  let token = data.toString();
  var config = {
    headers: { Authorization: token }
  };

  return dispatch => {
    return axios
      .get(url.concat("allUsers"), config)
      .then(data => {
        dispatch(getUserDetails(data));
      })
      .catch(function(error) {});
  };
};

/********* Image Upload ************/

export const imageUpload = (token, image, callBack) => {
  let url = localIP.concat("/upload");
  const config = {
    headers: {
      Authorization: token.toString(),
      "content-type": "multipart/form-data"
    }
  };
  let data = new FormData();
  data.append("file", image);
  return dispatch => {
    axios
      .post(url, data, config)
      .then(result => {
        console.log(result.data, "result.dataaaaaaaaaaaaaa");

        callBack(result);
      })
      .catch(error => {
        console.log("error ****** ", error);
      });
  };
};
