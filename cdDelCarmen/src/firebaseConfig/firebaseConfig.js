// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVmCHrr_AGTXflp881YqNnQAjz2wc40pY",
  authDomain: "bienestarpemex2023.firebaseapp.com",
  databaseURL: "https://bienestarpemex2023-default-rtdb.firebaseio.com",
  projectId: "bienestarpemex2023",
  storageBucket: "bienestarpemex2023.appspot.com",
  messagingSenderId: "304013444435",
  appId: "1:304013444435:web:18c58af37cf44911000da6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);