import {
    SET_USER_ID,
    SET_LOGGED_IN,
    SET_USER_INFO,
    SET_HOST_INFO,
} from "./actionTypes";

export const setUserId = (id) => ({ type: SET_USER_ID, payload: id });
export const setLoggedIn = (isLoggedIn) => ({ type: SET_LOGGED_IN, payload: isLoggedIn })
export const setUserInfo = (info) => ({ type: SET_USER_INFO, payload: info });
export const setHostInfo = (info) => ({ type: SET_HOST_INFO, payload: info });