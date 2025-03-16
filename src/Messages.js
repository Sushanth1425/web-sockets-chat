import React, { useState, useEffect, useRef } from "react";

const Messages = ({ username, roomID, darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = new WebSocket(`ws://localhost:8080/${roomID}`);

    socketRef.current.onopen = () => {
      socketRef.current.send(username); // Send username once connected
    };

    socketRef.current.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);

        if (parsedMessage.type === "history") {
          // Load previous messages from JSON
          setMessages(parsedMessage.messages);
        } else {
          // Append new messages
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    return () => {
      socketRef.current.close();
    };
  }, [username, roomID]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      socketRef.current.send(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-200 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      
      {/* Messages Container */}
      <div className="flex flex-col flex-grow overflow-auto p-4">
        {messages.map((msgObj, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-2xl max-w-sm self-start shadow-lg break-words mt-2 
              ${darkMode ? "bg-purple-800 text-white" : "bg-gray-300 text-black"}`}
          >
            <strong>{msgObj.sender}:</strong> {msgObj.msg}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={sendMessage} className="flex space-x-2 p-2">
        <input
          className={`w-full border border-gray-500 p-2 rounded focus:outline-none 
            ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="p-2 bg-purple-700 text-white rounded hover:bg-purple-500 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;
