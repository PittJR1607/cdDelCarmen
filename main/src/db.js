import { initializeApp } from "firebase/app"
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKCtaA6Bdd-pE3F7bwjGWCbsJHfO_rbe8",
  authDomain: "actividadespemex.firebaseapp.com",
  databaseURL: "https://actividadespemex-default-rtdb.firebaseio.com/",
  projectId: "actividadespemex",
  storageBucket: "actividadespemex.appspot.com",
  messagingSenderId: "408505317719",
  appId: "1:408505317719:web:5c5b51c883ec4a988be612",
  measurementId: "G-QVV2ETWBD3"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)