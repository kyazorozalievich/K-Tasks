import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbDBaAju6ILwEU_GnDtWDYYyvUnDTcPSA",
  authDomain: "task-14843.firebaseapp.com",
  projectId: "task-14843",
  storageBucket: "task-14843.firebasestorage.app",
  messagingSenderId: "196961016327",
  appId: "1:196961016327:web:5db49b6ed91636638028a2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
