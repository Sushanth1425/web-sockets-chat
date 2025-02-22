import React, { useState } from 'react';
import Login from './Login';
import Messages from './Messages';
//import './App.css'; 

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true); // User is now logged in
  };

  

  return (
    <div className="min-h-screen text-white ">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} /> // Show Login if not logged in
      ) : (
        <Messages username={username} /> // Show Messages if logged in
      )}
    </div>
  );
}

export default App;
