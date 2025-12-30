import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbkWGIoAnNUjfU23ooVZeGK0jDxcIdKyQ",
  authDomain: "boywithuke-fanpage-4bcc5.firebaseapp.com",
  projectId: "boywithuke-fanpage-4bcc5",
  storageBucket: "boywithuke-fanpage-4bcc5.firebasestorage.app",
  messagingSenderId: "562286447256",
  appId: "1:562286447256:web:4b7aba633308499a4a5eed",
  measurementId: "G-66JB2X1YP0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
