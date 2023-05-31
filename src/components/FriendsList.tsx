import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriend } from '../store';

//The FriendsList component provides the foundation for selecting friends and managing the UI state related to friend selection. This integration with Redux allows for seamless state management and updates across the application.

const FriendsList: React.FC = () => {
  // Retrieve the friends array from the state using useSelector
  const friends = useSelector((state: any) => state.friends);

  // Retrieve the selectedFriendId from the state using useSelector
  const selectedFriendId = useSelector((state: any) => state.selectedFriendId);

  // Access the dispatch function using useDispatch
  const dispatch = useDispatch();

  // Event handler for friend click
  const handleFriendClick = (friendId: number) => {
    // Dispatch the selectFriend action with the clicked friend's id
    dispatch(selectFriend(friendId));
  };

  return (
    <div className="friends-list">
      {/* Render each friend in the friends array */}
      {friends.map((friend: any) => (
        <div
          key={friend.id}
          className={`friend ${selectedFriendId === friend.id ? 'selected' : ''}`}
          onClick={() => handleFriendClick(friend.id)}
        >
          {friend.name}
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
