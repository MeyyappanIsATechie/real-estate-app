// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-99658.firebaseapp.com",
  projectId: "mern-estate-99658",
  storageBucket: "mern-estate-99658.appspot.com",
  messagingSenderId: "1054023200660",
  appId: "1:1054023200660:web:e05243c535acb7ac2e6981"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);