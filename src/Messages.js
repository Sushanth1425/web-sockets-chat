import React, { useState, useEffect, useRef } from 'react';

const Messages = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Create a WebSocket connection to the server
    socketRef.current = new WebSocket('ws://localhost:8080');

    socketRef.current.onmessage = (event) => {
      let newMessage = event.data;

      // Check if the message is a Blob
      if (newMessage instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Once the Blob is read, update the messages state with the text
          setMessages((prevMessages) => [
            ...prevMessages,
            reader.result, // Add the Blob as text to the messages list
          ]);
        };
        reader.readAsText(newMessage); // Convert Blob to text
      } else {
        // If the message is not a Blob, just add it as is
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    // Send the username to the server after connection
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
    <div className="flex flex-col h-screen bg-white border border-black border-solid  text-white p-4">
      <div id="messages" className="flex-grow overflow-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="message bg-blue-800 p-2 mb-2 rounded">
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
