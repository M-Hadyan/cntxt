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

export type AppAction = SelectFriendAction | AddMessageAction;
export { ActionType };
