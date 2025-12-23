 // src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpfIpBsCfXWGqcUI14fs_0cTHii1n0x0o",
  authDomain: "boywithuke-fanpage-82603.firebaseapp.com",
  projectId: "boywithuke-fanpage-82603",
  storageBucket: "boywithuke-fanpage-82603.firebasestorage.app",
  messagingSenderId: "1041418477438",
  appId: "1:1041418477438:web:bbf2f0d5dd6fdd2aee1d2f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
