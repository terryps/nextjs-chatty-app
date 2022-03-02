import {
    SET_LOGGED_IN,
    SET_USER_INFO,
    SET_HOST_INFO,
} from "./actionTypes";

export const setLoggedIn = (isLoggedIn) => ({ type: SET_LOGGED_IN, payload: isLoggedIn })
export const setUserInfo = (info) => ({ type: SET_USER_INFO, payload: info });
export const setHostInfo = (info) => ({ type: SET_HOST_INFO, payload: info });