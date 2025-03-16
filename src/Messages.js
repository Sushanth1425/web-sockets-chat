import React, { useState, useEffect, useRef } from 'react';

const Messages = ({ username, roomID }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection to the backend with roomID in the URL
    socketRef.current = new WebSocket(`ws://localhost:8080/${roomID}`);

    // Handle incoming messages
    socketRef.current.onmessage = (event) => {
      const newMessage = event.data;
      try {
        const parsedMessage = JSON.parse(newMessage);
        // If it's not a join/leave message, add it to the chat
        if (!parsedMessage.msg.includes("has joined") && !parsedMessage.msg.includes("has left")) {
          setMessages((prevMessages) => [...prevMessages, parsedMessage.msg]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    // Send the username when the connection opens
    socketRef.current.onopen = () => {
      socketRef.current.send(username); // Send the username only once
    };

    return () => {
      socketRef.current.close();
    };
  }, [username, roomID]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const userMessage = `${username}: ${inputMessage}`;
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      socketRef.current.send(userMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen text-white p-4">
      <div id="messages" className="flex-grow overflow-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="message bg-gray-200 text-black p-2 mb-2 rounded">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex space-x-2">
        <input
          className="w-full border border-solid p-2 text-black rounded focus:outline-none"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;
