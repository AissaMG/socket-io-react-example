import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";

const socket = io.connect("http://localhost:3005");

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "", room: "" });
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.username && userData.room) {
          setCurrentUser(userData);
          socket.emit("join_room", userData.room);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        localStorage.removeItem('chatUser');
      }
    }
    setIsLoading(false);
  }, []);

  const handleJoinRoom = ({ room, username }) => {
    const userData = { username, room };
    
    // Sauvegarder dans localStorage
    localStorage.setItem('chatUser', JSON.stringify(userData));
    
    socket.emit("join_room", room);
    setCurrentUser(userData);
    setIsConnected(true);
  };

  const handleLeaveRoom = () => {
    // Nettoyer localStorage des données utilisateur
    localStorage.removeItem('chatUser');
    
    // Nettoyer les messages de la room actuelle
    if (currentUser.room) {
      localStorage.removeItem(`chatMessages_${currentUser.room}`);
    }
    
    setIsConnected(false);
    setCurrentUser({ username: "", room: "" });
  };

  // Afficher un loading pendant la vérification localStorage
  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner">💬</div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return <Login onJoinRoom={handleJoinRoom} />;
  }

  return (
    <ChatRoom 
      socket={socket}
      username={currentUser.username}
      room={currentUser.room}
      onLeaveRoom={handleLeaveRoom}
    />
  );
}

export default App;
