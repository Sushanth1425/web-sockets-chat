import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name); // Pass the name to the parent component (App.js)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mb-10 ">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-center text-white mb-4">Enter your Name</h2>
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
        <button
          type="submit"
          className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Enter Chat Room
        </button>
      </form>
    </div>
  );
};

export default Login;
