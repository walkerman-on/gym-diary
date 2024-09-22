import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8dbhHk0_eHue7nAuWm0aMBzt80QWguw4",
  authDomain: "gym-tracker-18c82.firebaseapp.com",
  projectId: "gym-tracker-18c82",
  storageBucket: "gym-tracker-18c82.appspot.com",
  messagingSenderId: "655600590846",
  appId: "1:655600590846:web:e72b0c9b864427defa6aaf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

export { db, storage, collection, addDoc, doc, setDoc, getDoc, query, where, getDocs, deleteDoc, updateDoc };