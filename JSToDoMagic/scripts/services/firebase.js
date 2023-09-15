
// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
const firebaseConfig = {
    apiKey: "AIzaSyCN4KV_kJh0zg9o3MoPtTSN7f1PM1LAous",
    authDomain: "note-application-e1079.firebaseapp.com",
    projectId: "note-application-e1079",
    storageBucket: "note-application-e1079.appspot.com",
    messagingSenderId: "236953411775",
    appId: "1:236953411775:web:1f9e0d4f80023c2349660a"
  };
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export default db;
