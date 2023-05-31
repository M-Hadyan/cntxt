import { createStore } from 'redux';

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

// define the ActionType enum
enum ActionType {
    SELECT_FRIEND = 'SELECT_FRIEND',
    ADD_MESSAGE = 'ADD_MESSAGE',
}

// define selectFriendAction interface
interface SelectFriendAction {
    type: ActionType.SELECT_FRIEND;
    payload: number;
}

// define the AddMessageAction interface
interface AddMessageAction {
    type: ActionType.ADD_MESSAGE;
    payload: {
        friendId: number;
        message: string;
    };
}

// define the union type for AppAction
type AppAction = SelectFriendAction | AddMessageAction;

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
// update the state of the app. It takes two parameters, the current state and an action. The switch statement checks the action type and based on the type it updates the state accordingly.
const reducer = (state = initialState, action: AppAction): AppState => {
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

// select a friend to start chating "creator"
export const selectFriend = (friendId: number): SelectFriendAction => ({
    type: ActionType.SELECT_FRIEND,
    payload: friendId,
});

// add message 
export const addMessage = (friendId: number, message: string): AddMessageAction => ({
    type: ActionType.ADD_MESSAGE,
    payload: { friendId, message },
});
// Create the Redux store using the reducer
const store = createStore(reducer);

export default store;