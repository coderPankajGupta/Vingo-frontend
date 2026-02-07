// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-food-delivery-9f67d.firebaseapp.com",
  projectId: "vingo-food-delivery-9f67d",
  storageBucket: "vingo-food-delivery-9f67d.firebasestorage.app",
  messagingSenderId: "353994536996",
  appId: "1:353994536996:web:dd592a5c1140661e5a00b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
