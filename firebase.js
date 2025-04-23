// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPeuZRLZMhM97u7pp5YFLK72I9C26xgtI",
  authDomain: "gravitywebapp-ea5c0.firebaseapp.com",
  databaseURL: "https://gravitywebapp-ea5c0-default-rtdb.firebaseio.com",
  projectId: "gravitywebapp-ea5c0",
  storageBucket: "gravitywebapp-ea5c0.firebasestorage.app",
  messagingSenderId: "84069356895",
  appId: "1:84069356895:web:0af4be66230ecae7ac12ea"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
export const db = getFirestore(app);
