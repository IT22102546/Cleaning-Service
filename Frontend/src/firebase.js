// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cleaning-service-f9ecd.firebaseapp.com",
  projectId: "cleaning-service-f9ecd",
  storageBucket: "cleaning-service-f9ecd.appspot.com",
  messagingSenderId: "866846202928",
  appId: "1:866846202928:web:5da4055cfb65f55ca561f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };