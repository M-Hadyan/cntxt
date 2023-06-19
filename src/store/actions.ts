import { Action } from 'redux';
import ActionType from './actionTypes';

// define selectFriendAction interface
interface SelectFriendAction extends Action<ActionType.SELECT_FRIEND> {
  payload: number;
}

// define the AddMessageAction interface
interface AddMessageAction extends Action<ActionType.ADD_MESSAGE> {
  payload: {
    friendId: number;
    message: string;
  };
}

// define the EditMessageAction interface
interface EditMessageAction extends Action<ActionType.EDIT_MESSAGE> {
  payload: {
    friendId: string;
    messageId: string;
    newMessage: string; //edited one 
  };
}

// define the DeleteMessageAction interface
interface DeleteMessageAction extends Action<ActionType.DELETE_MESSAGE> {
  payload: {
    friendId: string;
    messageId: string;
  };
}

// select a friend to start chatting
export const selectFriend = (friendId: number): SelectFriendAction => ({
  type: ActionType.SELECT_FRIEND,
  payload: friendId,
});

// add message
export const addMessage = (friendId: number, message: string): AddMessageAction => ({
  type: ActionType.ADD_MESSAGE,
  payload: { friendId, message },
});

// edit message
export const editMessage = (friendId: string, messageId: string, newMessage: string): EditMessageAction => ({
  type: ActionType.EDIT_MESSAGE,
  payload: { friendId, messageId, newMessage },
});

// delete message
export const deleteMessage = (friendId: string, messageId: string): DeleteMessageAction => {
  return {
    type: ActionType.DELETE_MESSAGE,
    payload: {
      friendId,
      messageId,
    },
  };
}

//
export const updateFriendInput = (friendId: string, input: string) => ({
  type: ActionType.UPDATE_FRIEND_INPUT,
  payload: { friendId, input },
});

export type UpdateFriendInputAction = {
  type: ActionType.UPDATE_FRIEND_INPUT;
  payload: {
    friendId: string;
    input: string;
  };
};



export type AppAction = SelectFriendAction | AddMessageAction | EditMessageAction | DeleteMessageAction | UpdateFriendInputAction;
export { ActionType };
