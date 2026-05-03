# Chat App — Full Stack Setup

A real-time chat app built with React + Node.js + Socket.IO + MongoDB.

---

## Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Community](https://www.mongodb.com/try/download/community) — needs to be running locally

---

## 1. Start MongoDB

```bash
mongod
```

Keep this terminal open.

---

## 2. Start the Backend

```bash
cd chat-backend
npm install
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:3000
```

---

## 3. Start the Frontend

Open a new terminal:

```bash
cd chat
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## How to use

1. **Register** an account on the right side of the login screen
2. Open a second browser tab or incognito window and **register a second account**
3. In one tab, click **+** in the chat list and search for the other username
4. Click **Add User** → start chatting in real-time!

---

## Project Structure

```
chat-backend/
├── index.js              ← Express + Socket.IO server
├── .env                  ← JWT secret + MongoDB URI
├── models/
│   ├── User.js           ← User schema
│   └── Message.js        ← Message schema
├── routes/
│   ├── auth.js           ← POST /api/auth/login, /register
│   ├── users.js          ← GET /api/users/search
│   └── messages.js       ← GET/POST /api/messages
└── middleware/
    └── verifyToken.js    ← JWT auth guard

chat/
├── src/
│   ├── App.jsx           ← Auth state + layout
│   ├── lib/
│   │   ├── socket.js     ← Shared Socket.IO client
│   │   └── firbase.js    ← Firebase config (kept for future use)
│   └── components/
│       ├── login/        ← Register + Login forms
│       ├── list/         ← Sidebar: contacts + search
│       ├── chat/         ← Message window
│       └── detail/       ← User info + logout
```

---

## API Endpoints

| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/auth/register | No | Create account |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/users/search?username= | Yes | Search users |
| GET | /api/messages/:userId | Yes | Get conversation |
| POST | /api/messages | Yes | Send a message |
