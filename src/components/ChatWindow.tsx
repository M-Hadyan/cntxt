import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store/actions';
// import './ChatWindow.scss';

const ChatWindow: React.FC = () => {
  const friends = useSelector((state: any) => state.friends);
  const selectedFriendId = useSelector((state: any) => state.selectedFriendId);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [userHistoryData, setUserHistoryData] = useState<any>(null);

  // To update the message variable with the user's input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // To dispatch the addMessage action to the store with the selectedFriendId and message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFriendId !== null && message.trim() !== '') {
      dispatch(addMessage(selectedFriendId, message));
      setMessage('');
    }
  };

  const selectedFriend = friends.find((friend: any) => friend.id === selectedFriendId);

  const handleUserHistory = async (friendId: string) => {
    try {
      // Perform the API call to fetch the user history based on the selectedFriendId
      const response = await fetch(`https://6476147ce607ba4797dd44db.mockapi.io/api/vi/messages/${friendId}`);
      const userHistory = await response.json();

      // Process the fetched user history data
      console.log(userHistory);

      // Store the user history data in state
      setUserHistoryData(userHistory);

    } catch (error) {
      console.error('Error fetching user history:', error);
    }
  };

  useEffect(() => {
    // Clear the userHistoryData when selectedFriendId changes
    setUserHistoryData(null);
  }, [selectedFriendId]);

  return (
    <div className="chat-window">
      {selectedFriend ? (
        <>
          <div className="chat-header">{selectedFriend.name}</div>
          <div className="chat-messages">
            {selectedFriend.messages.map((msg: string, index: number) => (
              <div key={index} className="chat-message">
                {msg}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input type="text" value={message} onChange={handleInputChange} />
            <button type="submit">Send</button>
          </form>
          <button onClick={() => handleUserHistory(selectedFriendId)}>Show User history</button>
          {/* Render the ChatHistory component here based on the chatHistoryVisible state */}
        </>
      ) : (
        <div className="chat-empty">Select a friend to start a chat</div>
      )}

      {userHistoryData && (
        <div>
          <h2>User history</h2>
          <pre>{JSON.stringify(userHistoryData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
