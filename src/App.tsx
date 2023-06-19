import React from 'react';
import './assets/sass/style.scss';
import ChatWindow from './components/ChatWindow';
import FriendsList from './components/FriendsList';

const App = () => {
  return (
    <div className="app">
      <FriendsList />
      <ChatWindow />
    </div>
  );
};

export default App;
