import React, { useState, useEffect, useRef } from 'react';

const Messages = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8080');

    socketRef.current.onmessage = (event) => {
      let newMessage = event.data;
      if (newMessage instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMessages((prevMessages) => [
            ...prevMessages,
            reader.result, 
          ]);
        };
        reader.readAsText(newMessage); 
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socketRef.current.onopen = () => {
      socketRef.current.send(username);
    };

    return () => {
      socketRef.current.close();
    };
  }, [username]);

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
    <div className="flex flex-col h-screen  text-white p-4
      style={{
        backgroundImage: 'url(/NO_BG_PNG.png)', 
        backgroundSize: 'contain', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        height: '8px', 
        width: '100%', 
      }}
    ">
      <div id="messages" className="flex-grow overflow-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="message bg-gray-200 text-black p-2 mb-2 rounded">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex  space-x-2">
        <input
          className="w-full border border-solid p-2  text-black rounded focus:outline-none"
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
