import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, deleteMessage, editMessage, updateFriendInput  } from '../store/actions';
import '../assets/sass/style.scss';

const ChatWindow = () => {
  const friends = useSelector((state: any) => state.friends);

  const selectedFriendId = useSelector((state: any) => state.selectedFriendId);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [userHistoryData, setUserHistoryData] = useState<any>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const [messageSortOrder, setMessageSortOrder] = useState('desc');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFriendInput(selectedFriendId, e.target.value));
    setMessage(e.target.value);
  };
  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFriendId !== null && message.trim() !== '') {
      dispatch(addMessage(selectedFriendId, message));
      setMessage('');
    }
  };

  const [editedMessage, setEditedMessage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

  const handleEditClick = (messageId: string) => {
    setEditingMessageId(messageId);
    const messageToEdit = selectedFriend.messages.find((msg: any) => msg.id === messageId);
    setEditedMessage(messageToEdit ? messageToEdit.content : '');
  };

  // Submit event for editing a message
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFriendId !== null && editingMessageId !== null && editedMessage.trim() !== '') {
      dispatch(editMessage(selectedFriendId, editingMessageId, editedMessage));
      setEditingMessageId(null);
      setEditedMessage('');
    }
  };

  const handleEditedMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMessage(e.target.value);
  };

  const selectedFriend = friends.find((friend: any) => friend.id === selectedFriendId);

  const handleChatDelete = (friendId: string, messageId: string) => {
    dispatch(deleteMessage(friendId, messageId));
  };

  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
  };

  const handleUserHistory = async (friendId: string) => {
    try {
      const response = await fetch(`https://648acc3217f1536d65e9b47c.mockapi.io/api/v1/messages/${friendId}`);
      const userHistory = await response.json();
      console.log(userHistory);
      setUserHistoryData(userHistory);
    } catch (error) {
      console.error('Error fetching user history:', error);
    }
  };

  useEffect(() => {
    setUserHistoryData(null);
    if (selectedFriend) {
      setMessage(selectedFriend.input || ''); // Add this line to clear the input field when the selected friend changes
    } else {
      setMessage('');
    }
  }, [selectedFriendId, selectedFriend]);

  const applySortOrder = (messages: any[]) => {
    if (messageSortOrder === 'asc') {
      return messages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else {
      return messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  };

  const sortMessages = (messages: any[]) => {
    const activeChats = applySortOrder(messages.filter((msg) => !msg.completed));
    const completedChats = applySortOrder(messages.filter((msg) => msg.completed));
    return [...activeChats, ...completedChats];
  };

  return (
    <div className="chat-window">
      {selectedFriend ? (
        <>
          <div className="chat-header">{selectedFriend.name}</div>
          <div className="chat-messages">

            <div className="sort-buttons">
              <button onClick={() => setMessageSortOrder('asc')}>Sort Ascending</button>
              <button onClick={() => setMessageSortOrder('desc')}>Sort Descending</button>
            </div>

            {sortMessages(selectedFriend.messages).map((msg: any) => (
              <div key={msg.id}
                className={`chat-message${hovered === msg.id ? " hover" : ""}`}
                onMouseEnter={() => setHovered(msg.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {msg.content}
                <br />
                {formatDateTime(msg.created_at)}
                <br />
                <button
                  className="delete-button"
                  onClick={() => handleChatDelete(selectedFriend.id, msg.id)}
                  style={{ display: hovered === msg.id ? 'inline' : 'none' }}
                >
                  X
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(msg.id)}
                  style={{ display: hovered === msg.id ? 'inline' : 'none' }}
                >
                  Edit
                </button>
              </div>
            ))}

            <form onSubmit={handleSubmit}>
            <input
  type="text"
  onChange={handleInputChange}
  value={message}
  placeholder="Type a message..."
/>


              <button type="submit">Send</button>
            </form>

          </div>




          {editingMessageId !== null && (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                onChange={handleEditedMessageChange}
                value={editedMessage}
                placeholder="Edit message..."
              />
              <button type="submit">Save</button>
              <button onClick={() => { setEditingMessageId(null); setEditedMessage(''); }}>Cancel</button>
            </form>
          )}
        </>
      ) : (
        <div className="no-friend-selected">Please select a friend to start chatting.</div>
      )}
    </div>
  )
};

export default ChatWindow;