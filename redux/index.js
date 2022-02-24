import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
    SET_USER_ID,
    SET_LOGGED_IN,
    SET_USER_INFO,
    SET_HOST_INFO,
} from "./actions/actionTypes";

const initialState = {
    userId: null,
    isLoggedIn: false,
    userInfo: null,
    hostInfo: null,
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload, };
        case SET_USER_ID:
            return { ...state, userId: action.payload, };
        case SET_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload, };
        case SET_USER_INFO:
            return { ...state, userInfo: action.payload, };
        case SET_HOST_INFO:
            return { ...state, hostInfo: action.payload, };
        default:
            return state;
    }
}

const makeStore = () => {
	return createStore(reducer, initialState);
}

const wrapper = createWrapper(makeStore, {debug: process.env.NODE_ENV!=="production"});
export default wrapper;