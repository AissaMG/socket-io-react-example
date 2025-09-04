# 💬 Chat App - Socket.IO + React

Une application de chat en temps réel moderne utilisant Socket.IO et React, avec design professionnel et fonctionnalités avancées.

## ✨ Fonctionnalités

### 🚀 Chat en temps réel
- **Messages instantanés** entre utilisateurs connectés
- **Rooms personnalisées** - Rejoignez n'importe quelle room par son numéro
- **Interface pleine page** - Design immersif type Discord/WhatsApp

### 🎨 Design moderne
- **Interface glassmorphism** avec dégradés violet/bleu
- **Avatars colorés** avec initiales générées automatiquement
- **Bulles de messages** différenciées (vos messages vs autres)
- **Groupement intelligent** des messages par utilisateur/minute
- **Animations fluides** et transitions

### 💾 Persistance des données
- **Session permanente** - Reste connecté même après refresh/fermeture
- **Historique des messages** - Tous les messages sauvegardés localement
- **Reconnexion automatique** au redémarrage
- **Déconnexion sécurisée** avec confirmation

### 📱 Responsive Design
- **Adaptatif** desktop/mobile/tablette
- **Inputs responsives** avec validation
- **Layout optimisé** pour tous les écrans

## 🛠️ Technologies

- **Frontend**: React 17, Socket.IO Client, CSS3
- **Backend**: Node.js, Express, Socket.IO
- **Architecture**: Composants modulaires, localStorage pour persistance

## 📦 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd socket-io-react-example
```

### 2. Installation des dépendances

**Serveur :**
```bash
cd server
npm install
```

**Client :**
```bash
cd client
npm install
```

## 🚀 Démarrage

### 1. Démarrer le serveur (Terminal 1)
```bash
cd server
npm start
# ou avec nodemon pour le développement :
npx nodemon index.js
```
Le serveur démarre sur `http://localhost:3005`

### 2. Démarrer le client (Terminal 2)
```bash
cd client
npm start
```
Le client démarre sur `http://localhost:3001`

## 📖 Utilisation

1. **Connexion** - Entrez votre nom et un numéro de room
2. **Chat** - Tapez vos messages et appuyez sur Entrée
3. **Partage** - Partagez le numéro de room avec d'autres utilisateurs
4. **Persistance** - Fermez/rouvrez l'onglet, vous restez connecté !

## 📁 Structure du projet

```
socket-io-react-example/
├── client/                 # Application React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js    # Écran de connexion
│   │   │   └── ChatRoom.js # Interface de chat
│   │   ├── App.js          # Composant principal
│   │   └── App.css         # Styles globaux
│   └── package.json
├── server/                 # Serveur Socket.IO
│   ├── index.js           # Serveur principal
│   └── package.json
└── README.md
```

## ⚙️ Configuration

### Ports
- **Client**: `3001` (React Dev Server)
- **Serveur**: `3005` (Socket.IO)

### CORS
Le serveur accepte les connexions depuis `http://localhost:3001`

## 🎯 Fonctionnalités techniques

### Gestion des messages
- **Groupement automatique** des messages du même utilisateur
- **Timestamps** avec format HH:MM
- **Avatars générés** avec couleurs consistantes
- **Limite de 100 messages** par room (localStorage)

### Session management
- **Auto-reconnexion** via localStorage
- **Nettoyage intelligent** lors de la déconnexion
- **Gestion d'erreur** pour les données corrompues

### Responsive
- **Breakpoints** optimisés pour mobile
- **Inputs adaptatifs** avec validation
- **Messages redimensionnés** selon l'écran

## 🔧 Développement

### Scripts disponibles

**Client :**
- `npm start` - Mode développement
- `npm build` - Build de production
- `npm test` - Tests

**Serveur :**
- `npm start` - Démarrage serveur
- `npx nodemon index.js` - Mode développement avec auto-reload

### Personnalisation
- **Couleurs** : Modifiez la palette dans `getAvatarColor()`
- **Limite messages** : Ajustez dans `saveMessagesToStorage()`
- **Styles** : Personnalisez `App.css`

## 🐛 Dépannage

### Problèmes courants

**Connexion impossible :**
- Vérifiez que le serveur est démarré sur le port 3005
- Contrôlez la configuration CORS

**Messages non reçus :**
- Assurez-vous d'être dans la même room
- Redémarrez le serveur si nécessaire

**Problème de persistance :**
- Vérifiez que localStorage est activé
- Clearez le cache si comportement anormal

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir des issues pour les bugs
- Proposer de nouvelles fonctionnalités
- Soumettre des pull requests

---

**Créé par Aïss@MAIGA avec ❤️ en utilisant React et Socket.IO**