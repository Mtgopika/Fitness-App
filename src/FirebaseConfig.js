// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJKDl9bMpVdPEmi4VEalFPzTbtdzXGsQs",
  authDomain: "myproject-bff33.firebaseapp.com",
  projectId: "myproject-bff33",
  storageBucket: "myproject-bff33.appspot.com",
  messagingSenderId: "845107440174",
  appId: "1:845107440174:web:ef150a8cd7fc0d868fcdbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);

