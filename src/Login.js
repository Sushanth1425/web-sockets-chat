import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && roomID.trim()) {
      onLogin(name, roomID); // Pass both name and room ID
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-center text-white mb-4">Enter Room Code</h2>

        {/* Name Input */}
        <label className="text-white block mb-2" htmlFor="username">
          Name:
        </label>
        <input
          className="w-full p-2 mb-4 bg-gray-600 text-white rounded focus:outline-none"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Room ID Input */}
        <label className="text-white block mb-2" htmlFor="roomID">
          Room ID:
        </label>
        <input
          className="w-full p-2 mb-4 bg-gray-600 text-white rounded focus:outline-none"
          type="text"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none"
        >
          Enter Chat Room
        </button>
      </form>
    </div>
  );
};

export default Login;
