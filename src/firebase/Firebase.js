// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAb6KXo6kfqT7uL24Puw7BFgmBs2wF-GDk",
  authDomain: "santosh-794bf.firebaseapp.com",
  projectId: "santosh-794bf",
  storageBucket: "santosh-794bf.firebasestorage.app",
  messagingSenderId: "391872388287",
  appId: "1:391872388287:web:fb03a6d336b65cdd38fa0a",
  measurementId: "G-2SE4EHJF7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const fireDB = getFirestore(app) // initialize firestore 

export { fireDB, auth, firebaseConfig };