import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../keys/firebase';

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const auth = getAuth(app);
export const fs = getFirestore(app);
export const st = getStorage(app);
