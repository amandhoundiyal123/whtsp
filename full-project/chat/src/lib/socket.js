// import { io } from "socket.io-client";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// const socket = io(BACKEND_URL, {
//   autoConnect: false, // we connect manually after login
// });

// export default socket;

import { io } from "socket.io-client";

// ✅ Use env variable (for deployment) or fallback
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://chat-backend-12z8.onrender.com";

const socket = io(BACKEND_URL, {
  autoConnect: false, // connect after login
  transports: ["websocket"], // ✅ important for Render
});

export default socket;