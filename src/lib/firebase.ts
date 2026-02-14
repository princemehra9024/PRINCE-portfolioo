
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase project configuration
// You can get this from the Firebase Console > Project Settings > General > "Add app"
const firebaseConfig = {
    apiKey: "AIzaSyD52cBzJPKZ001KBfVuqijVRThHrgJzmVg",
    authDomain: "portfolio-ef309.firebaseapp.com",
    projectId: "portfolio-ef309",
    storageBucket: "portfolio-ef309.firebasestorage.app",
    messagingSenderId: "942967670215",
    appId: "1:942967670215:web:fceca9a6f9d1210e0105e2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
