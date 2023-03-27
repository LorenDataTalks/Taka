// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onValue, ref,getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCghaVlLJzaD_y4g3LQQR_LfJ1JmLJYE14",
  authDomain: "bin-monitor-cac30.firebaseapp.com",
  projectId: "bin-monitor-cac30",
  storageBucket: "bin-monitor-cac30.appspot.com",
  messagingSenderId: "644573942040",
  appId: "1:644573942040:web:1f2e39074d926f24630e6d",
  measurementId: "G-E3JJ29WD0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const AuthDatabase = getDatabase(app);