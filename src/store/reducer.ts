import { Reducer } from 'redux';
import ActionType from './actionTypes';
import { AppAction } from './actions';


// Define the Friend interface
interface Friend {
  id: number;
  name: string;
  messages: Message[];
  email: string;
  input: string;
}

// Define the Message interface
interface Message {
  id: number;
  content: string;
  created_at: Date;
  completed_at: Date | null;
}

// Define the AppState interface
interface AppState {
  friends: Friend[];
  selectedFriendId: number | null;
}

// Initial state of the app
const initialState: AppState = {
  friends: [
    { id: 1, name: 'Friend 1', messages: [], email: 'friend_1@example.com', input: '' },
    { id: 2, name: 'Friend 2', messages: [], email: 'friend_2@example.com', input: '' },
    { id: 3, name: 'Friend 3', messages: [], email: 'friend_3@example.com', input: '' },
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
              messages: [
                ...friend.messages,
                {
                  id: Date.now(),
                  content: action.payload.message,
                  created_at: new Date(),
                  completed_at: null,
                },
              ],
            }
            : friend
        ),
      };
    case ActionType.UPDATE_FRIEND_INPUT:
      return {
        ...state,
        friends: state.friends.map((friend: any) =>
          friend.id === action.payload.friendId
            ? { ...friend, input: action.payload.input }
            : friend
        ),
      };

    case ActionType.DELETE_MESSAGE: {
      const { friendId, messageId } = action.payload;

      const newFriends = state.friends.map((friend: Friend) => {
        if (friend.id === Number(friendId)) {
          return {
            ...friend,
            messages: friend.messages.filter((msg: Message) => msg.id !== Number(messageId)),
          };
        }
        return friend;
      });

      return {
        ...state,
        friends: newFriends,
      };
    }

    default:
      return state;
  }
};

export default reducer;
