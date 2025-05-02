// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrTgIbsrElAo4OVft6KL-YSdwbxXJXfck",
  authDomain: "pataki-portfolio.firebaseapp.com",
  projectId: "pataki-portfolio",
  storageBucket: "pataki-portfolio.firebasestorage.app",
  messagingSenderId: "113481125160",
  appId: "1:113481125160:web:e1317885998f313d27541d",
  measurementId: "G-R39TRSWY32"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };