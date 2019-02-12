/*
 * @file: user.js
 * @description: User Reducer
 *
 */

import { LOGIN, UPDATE_PROFILE, USER_DATA } from "./constants";

const initialState = {
  isLoggedIn: false,
  userDetails: null,
  getUserDetails: null
};

export default function reducer(state = initialState, action) {
  console.log(action.data, "action");
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: action.data ? true : false,
        userDetails: action.data ? action.data : null
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.data }
      };

    case USER_DATA:
      return { ...state, getUserDetails: { ...action.data } };

    default:
      return state;
  }
}
