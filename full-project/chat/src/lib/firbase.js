import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-3bca4.firebaseapp.com",
  projectId: "reactchat-3bca4",
  storageBucket: "reactchat-3bca4.firebasestorage.app",
  messagingSenderId: "846207071294",
  appId: "1:846207071294:web:928eff9e36d3178e0a4d6f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
