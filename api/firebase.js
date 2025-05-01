// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYjn8e-xTjL--IMZxp7PXX29AqOyTAYcU",
  authDomain: "iteckk-2234e.firebaseapp.com",
  projectId: "iteckk-2234e",
  storageBucket: "iteckk-2234e.firebasestorage.app",
  messagingSenderId: "120387923034",
  appId: "1:120387923034:web:e3543fc25470090601fc63",
  measurementId: "G-EBHTCKN0H0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export default app;