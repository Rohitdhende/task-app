// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3_qRk3nYwkGdkigE0bG01KVQXu_YfXoI",
  authDomain: "task-app-41ea7.firebaseapp.com",
  projectId: "task-app-41ea7",
  storageBucket: "task-app-41ea7.appspot.com",
  messagingSenderId: "416133125969",
  appId: "1:416133125969:web:d32824dd48bb34af122570",
  measurementId: "G-90VGEZ3YQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


