import { initializeApp } from 'firebase/app';
import { getStorage, ref } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_API_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_API_PROJECT_ID,
  storageBucket: process.env.FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_API_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

export { db, storage, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs, deleteDoc };