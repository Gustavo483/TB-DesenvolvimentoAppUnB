import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const auth = getAuth(app);
const fs = getFirestore(app);
const st = getStorage(app);

export { auth, fs, st }
