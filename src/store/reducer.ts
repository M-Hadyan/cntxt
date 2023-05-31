import { Reducer } from 'redux';
import ActionType from './actionTypes';
import { AppAction } from './actions';

// define the Friend interface
interface Friend {
  id: number;
  name: string;
  messages: string[];
}

// define the AppState interface
interface AppState {
  friends: Friend[];
  selectedFriendId: number | null;
}

// initial state of the app
const initialState: AppState = {
  friends: [
    { id: 1, name: 'Friend 1', messages: [] },
    { id: 2, name: 'Friend 2', messages: [] },
    { id: 3, name: 'Friend 3', messages: [] },
  ],
  selectedFriendId: null,
};

// Define the reducer function
const reducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_FRIEND:
      return { ...state, selectedFriendId: action.payload };
    case ActionType.ADD_MESSAGE:
      return {
        ...state,
        friends: state.friends.map((friend) =>
          friend.id === action.payload.friendId
            ? {
                ...friend,
                messages: [...friend.messages, action.payload.message],
              }
            : friend
        ),
      };
    default:
      return state;
  }
};

export default reducer;
