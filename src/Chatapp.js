import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './styles.css';

const socket = io('http://localhost:4000'); // Your backend socket.io server URL

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { username: 'You', text: message };
      socket.emit('send_message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>General Chat</h1>
        <button className="close-btn">X</button>
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p className="username">{msg.username}:</p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
