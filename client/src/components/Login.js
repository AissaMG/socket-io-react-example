import { useState } from "react";

function Login({ onJoinRoom }) {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (room !== "" && username !== "") {
      onJoinRoom({ room, username });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };

  return (
    <div className="app">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>💬 Chat App</h1>
            <p>Rejoignez une conversation</p>
          </div>
          <div className="login-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Votre nom..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Numéro de room..."
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="login-input"
                onKeyDown={handleKeyDown}
              />
            </div>
            <button 
              onClick={handleJoin} 
              className="join-button"
              disabled={!room || !username}
            >
              Rejoindre la Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;