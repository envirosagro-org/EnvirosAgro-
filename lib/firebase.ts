import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAD19Ni2GjWLM3vJWAIXayl4GwJeTDvWg",
  authDomain: "envirosagro-git-79265384-d5a15.firebaseapp.com",
  projectId: "envirosagro-git-79265384-d5a15",
  storageBucket: "envirosagro-git-79265384-d5a15.firebasestorage.app",
  messagingSenderId: "433406385828",
  appId: "1:433406385828:web:32435a060395b6fbf91031",
  measurementId: "G-31YH2XYV15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (check if supported for SSR/non-browser environments)
export const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : Promise.resolve(null);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
