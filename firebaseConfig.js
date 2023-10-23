import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBgAYTGjF0lZDGYxxy9I-dld7kkR4ksd40",
    authDomain: "meau-1f2c2.firebaseapp.com",
    projectId: "meau-1f2c2",
    storageBucket: "meau-1f2c2.appspot.com",
    messagingSenderId: "1045393156854",
    appId: "1:1045393156854:web:9e14ebc1bc9f0e9256dad7",
    measurementId: "G-5Z2WXS4QKD"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIRESTORE_DB = getFirestore(FIREBASE_APP)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const fs = getFirestore(app);

export { auth, fs,FIREBASE_APP,FIREBASE_AUTH,FIRESTORE_DB }
