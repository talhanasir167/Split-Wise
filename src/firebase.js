

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSwXhNCmLE1nmdjl6sH5MV8GUnrRAethU",
  authDomain: "split-wise-991c2.firebaseapp.com",
  projectId: "split-wise-991c2",
  storageBucket: "split-wise-991c2.appspot.com",
  messagingSenderId: "320184589347",
  appId: "1:320184589347:web:6d3fceb2c33554b0c42596"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
