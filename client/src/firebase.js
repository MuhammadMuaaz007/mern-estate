// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6ac60.firebaseapp.com",
  projectId: "mern-estate-6ac60",
  storageBucket: "mern-estate-6ac60.firebasestorage.app",
  messagingSenderId: "667702080894",
  appId: "1:667702080894:web:ffb6909f7352a8b1bd2f2f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);