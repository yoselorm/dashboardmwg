// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDj1I0-1RiFGQBIRtjYHMwACFUJsVudBYc",
    authDomain: "dash-a6bd7.firebaseapp.com",
    projectId: "dash-a6bd7",
    storageBucket: "dash-a6bd7.appspot.com",
    messagingSenderId: "733541966659",
    appId: "1:733541966659:web:f8b19e9c92538ec5f1c5f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export default app;