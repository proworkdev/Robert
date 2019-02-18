/*
 * @file: actions.js
 * @description:  Actions for user reducer
 */

import { LOGIN, UPDATE_PROFILE, USER_DATA } from "./constants";
import axios from "axios";
import API_URL from "../../config/APIurl";

// actions
export const login = data => ({ type: LOGIN, data: data });
export const updateProfile = () => ({ type: UPDATE_PROFILE });
export const getUserDetails = data => ({ type: USER_DATA, data: data });

const headers = {
  "Content-Type": "application/json"
};

/********* API to login data ************/
export const loginComplete = data => {
  let url = API_URL.concat("/signin");
  return dispatch => {
    return axios
      .post(url, data, headers)
      .then(data => {
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
  let url = API_URL.concat("/");
  return dispatch => {
    return axios
      .get(url.concat("allUsers"), getAuthHeader(data))
      .then(data => {
        dispatch(getUserDetails(data));
      })
      .catch(function(error) {});
  };
};

/********* Image Upload ************/

export const imageUpload = (token, image, callBack) => {
  let url = API_URL.concat("/upload");
  let data = new FormData();
  data.append("file", image);
  return dispatch => {
    axios
      .post(url, data, getAuthHeader(data))
      .then(result => {
        callBack(result);
      })
      .catch(error => {
        console.log("error ****** ", error);
      });
  };
};

// return auth headers
const getAuthHeader = (data) => {
  let token = data.toString();
  return {
    headers: { Authorization: token }
  };
}