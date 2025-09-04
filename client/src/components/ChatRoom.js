import { useState, useEffect, useRef } from "react";

function ChatRoom({ socket, username, room, onLeaveRoom }) {
  // Fonction pour générer une couleur basée sur le nom d'utilisateur
  const getAvatarColor = (name) => {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe',
      '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3',
      '#ff9a9e', '#fecfef', '#feca57', '#ff6b6b', '#ee5a24', '#0abde3',
      '#10ac84', '#5f27cd', '#00d2d3', '#ff9ff3', '#54a0ff', '#5f27cd'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Fonction pour obtenir les initiales
  const getInitials = (name) => {
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Fonctions de gestion des messages en localStorage
  const getMessagesStorageKey = (roomName) => `chatMessages_${roomName}`;
  
  const saveMessagesToStorage = (messages, roomName) => {
    try {
      // Limiter à 100 messages pour éviter de saturer localStorage
      const limitedMessages = messages.slice(-100);
      localStorage.setItem(getMessagesStorageKey(roomName), JSON.stringify(limitedMessages));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des messages:', error);
    }
  };

  const loadMessagesFromStorage = (roomName) => {
    try {
      const savedMessages = localStorage.getItem(getMessagesStorageKey(roomName));
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      return [];
    }
  };

  const [message, setMessage] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);
  const messagesEndRef = useRef(null);

  // Fonction pour déterminer si les messages doivent être groupés
  const shouldGroupMessage = (currentMsg, previousMsg) => {
    if (!previousMsg) return false;
    
    // Même utilisateur
    if (currentMsg.username !== previousMsg.username) return false;
    
    // Dans la même minute
    const currentTime = new Date(`2000-01-01 ${currentMsg.timestamp}`);
    const previousTime = new Date(`2000-01-01 ${previousMsg.timestamp}`);
    
    const timeDiff = Math.abs(currentTime - previousTime);
    return timeDiff < 60000; // 60 secondes
  };

  // Charger les messages sauvegardés au montage du composant
  useEffect(() => {
    const savedMessages = loadMessagesFromStorage(room);
    if (savedMessages.length > 0) {
      setMessagesReceived(savedMessages);
    }
  }, [room]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesReceived]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        username,
        message: message.trim(),
        room,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Sauvegarder les messages à chaque changement
  useEffect(() => {
    if (messagesReceived.length > 0) {
      saveMessagesToStorage(messagesReceived, room);
    }
  }, [messagesReceived, room]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessagesReceived((prev) => {
        // Éviter les doublons si le message existe déjà
        const messageExists = prev.some(msg => 
          msg.username === data.username && 
          msg.message === data.message && 
          msg.timestamp === data.timestamp
        );
        
        if (messageExists) {
          return prev;
        }
        
        return [...prev, data];
      });
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="chat-room">
      <div className="chat-header">
        <div className="room-info">
          <h2>Room #{room}</h2>
          <span className="user-name">{username}</span>
        </div>
        <button 
          onClick={() => {
            if (window.confirm('Êtes-vous sûr de vouloir quitter la conversation ? Vous devrez vous reconnecter.')) {
              onLeaveRoom();
            }
          }} 
          className="leave-button"
        >
          Déconnexion
        </button>
      </div>
      
      <div className="messages-container">
        <div className="messages-list">
          {messagesReceived.map((msg, i) => {
            const previousMsg = i > 0 ? messagesReceived[i - 1] : null;
            const isGrouped = shouldGroupMessage(msg, previousMsg);
            const isOwnMessage = msg.username === username;
            
            return (
              <div 
                key={i} 
                className={`message-wrapper ${isOwnMessage ? 'own-message' : 'other-message'} ${isGrouped ? 'grouped' : ''}`}
              >
                {!isGrouped && (
                  <div className="message-author">
                    <div 
                      className="message-avatar"
                      style={{ backgroundColor: getAvatarColor(msg.username) }}
                    >
                      {getInitials(msg.username)}
                    </div>
                    <span className="message-username">{msg.username}</span>
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">{msg.message}</div>
                  <div className="message-footer">
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="message-input-container">
        <div className="message-input-wrapper">
          <input
            type="text"
            placeholder="Tapez votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="message-input"
          />
          <button 
            onClick={sendMessage} 
            className="send-button"
            disabled={!message.trim()}
          >
            <span>📤</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;