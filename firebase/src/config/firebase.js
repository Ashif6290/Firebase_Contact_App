// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiLqHk3Isiq28u_KeCEKvY71et4X0MM3c",
  authDomain: "contact-app-57794.firebaseapp.com",
  projectId: "contact-app-57794",
  storageBucket: "contact-app-57794.appspot.com",
  messagingSenderId: "1046381840250",
  appId: "1:1046381840250:web:cf685cb63e418f627df8c3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);