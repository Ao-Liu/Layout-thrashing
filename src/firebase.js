// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK3M4YofnyhtqbzsXxa822ftZgHcSwwhw",
  authDomain: "layout-thrashing.firebaseapp.com",
  projectId: "layout-thrashing",
  storageBucket: "layout-thrashing.appspot.com",
  messagingSenderId: "1083819091573",
  appId: "1:1083819091573:web:ad62f9d30605c0cd1ffa3c",
  measurementId: "G-C8T7Y0HPMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database };
