// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onValue, ref,getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7wTMTO6btAvBaGMntpM4SVc6fKISQyXw",
  authDomain: "bin-monitor-8d86f.firebaseapp.com",
  databaseURL: "https://bin-monitor-8d86f-default-rtdb.firebaseio.com",
  projectId: "bin-monitor-8d86f",
  storageBucket: "bin-monitor-8d86f.appspot.com",
  messagingSenderId: "342241604814",
  appId: "1:342241604814:web:d98d887d05cc1b54fa0c9f",
  measurementId: "G-RRMPZ4KVQ0"
}; // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const MainDatabase = getDatabase(app);