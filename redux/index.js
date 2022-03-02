import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
    SET_LOGGED_IN,
    SET_USER_INFO,
    SET_HOST_INFO,
    SHOW_MESSAGE_MODAL,
    HIDE_MESSAGE_MODAL,
    SHOW_ADD_FRIEND_MODAL,
    HIDE_ADD_FRIEND_MODAL,
} from "./actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    hostInfo: null,
    messageModal: {
        open: false,
        type: "",
        content: "",
    },
    addFriendModal: {
        open: false,
        userInfo: null,
    },
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload, };
        case SET_LOGGED_IN:
            return { ...state, isLoggedIn: action.payload, };
        case SET_USER_INFO:
            return { ...state, userInfo: action.payload, };
        case SET_HOST_INFO:
            return { ...state, hostInfo: action.payload, };
        case SHOW_MESSAGE_MODAL:
            return { ...state, messageModal: { open: true, ...action.payload, }, };
        case HIDE_MESSAGE_MODAL:
            return { ...state, messageModal: { open: false, type: "", content: "", }, };
        case SHOW_ADD_FRIEND_MODAL:
            return { ...state, addFriendModal: { open: true, ...action.payload, }, };
        case HIDE_ADD_FRIEND_MODAL:
            return { ...state, addFriendModal: { open: false, userInfo: null, }, };
        default:
            return state;
    }
}

const makeStore = () => {
	return createStore(reducer, initialState);
}

const wrapper = createWrapper(makeStore, {debug: process.env.NODE_ENV!=="production"});
export default wrapper;