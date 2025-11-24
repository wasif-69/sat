// /lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkgbpHK7ywlcYC0-25tBMvcZ8PoeGCV3I",
  authDomain: "brainbuddy-2d486.firebaseapp.com",
  projectId: "brainbuddy-2d486",
  storageBucket: "brainbuddy-2d486.firebasestorage.app",
  messagingSenderId: "310353281151",
  appId: "1:310353281151:web:40c7afa59d21f399c5ff4a",
  measurementId: "G-5DR138WPK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
