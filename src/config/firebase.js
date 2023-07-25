// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeQnh_E_b9x0YEO1rKke5YGo3P2LEXvh8",
  authDomain: "auth-sql.firebaseapp.com",
  projectId: "auth-sql",
  storageBucket: "auth-sql.appspot.com",
  messagingSenderId: "838481635434",
  appId: "1:838481635434:web:9a5035b7489db51ca58213",
  measurementId: "G-G2ZN66C0G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, analytics, db}