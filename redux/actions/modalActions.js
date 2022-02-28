import {
    SHOW_MESSAGE_MODAL,
    HIDE_MESSAGE_MODAL,
    SHOW_ADD_FRIEND_MODAL,
    HIDE_ADD_FRIEND_MODAL,
} from "./actionTypes";

export const showMessageModal = (messageType, messageContent) => ({
    type: SHOW_MESSAGE_MODAL,
    payload: { type: messageType, content: messageContent }
});
export const hideMessageModal = () => ({ type: HIDE_MESSAGE_MODAL });
export const showAddFriendModal = (userInfo) => ({
    type: SHOW_ADD_FRIEND_MODAL,
    payload: { userInfo: userInfo }
});
export const hideAddFriendModal = () => ({ type: HIDE_ADD_FRIEND_MODAL });