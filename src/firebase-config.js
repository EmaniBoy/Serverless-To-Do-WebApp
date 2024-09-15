// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG9QrwpobZgI0sz-m_Zttf7Ow6VNpXyKk",
  authDomain: "todo-e0d39.firebaseapp.com",
  projectId: "todo-e0d39",
  storageBucket: "todo-e0d39.appspot.com",
  messagingSenderId: "413009951940",
  appId: "1:413009951940:web:1d56cb6004f5bf5fa01d91",
  measurementId: "G-0V6VGN6R0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

