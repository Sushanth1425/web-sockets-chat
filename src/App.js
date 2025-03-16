import React, { useState, useEffect } from "react";
import Login from "./Login";
import Messages from "./Messages";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roomID, setRoomID] = useState(""); // Ensured room ID is included
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogin = (name, room) => {
    setUsername(name);
    setRoomID(room);
    setIsLoggedIn(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded bg-gray-700 text-white hover:bg-gray-500 transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {!isLoggedIn ? (
        <Login onLogin={handleLogin} /> // Login screen
      ) : (
        <Messages username={username} roomID={roomID} darkMode={darkMode} /> // Chat screen
      )}
    </div>
  );
}

export default App;
