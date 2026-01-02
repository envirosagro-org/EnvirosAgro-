
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNVYoqxPepnbRRtC68BRTxgqFp1FVO3xI",
  authDomain: "envirosagro-git-93534258-78537.firebaseapp.com",
  projectId: "envirosagro-git-93534258-78537",
  storageBucket: "envirosagro-git-93534258-78537.firebasestorage.app",
  messagingSenderId: "399076515746",
  appId: "1:399076515746:web:f947e5e4dd216826b81cfb",
  measurementId: "G-1MNDXE8PG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (check if supported for SSR/non-browser environments)
export const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : Promise.resolve(null);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
