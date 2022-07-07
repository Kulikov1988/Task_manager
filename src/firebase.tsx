import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
  } from 'firebase/auth';

console.log(process.env)

const firebaseConfig = {
  apiKey: "AIzaSyAD0fkZslW4VisBi5vT3XDbfEEAKXmUDbk",
  authDomain: "task-manager-ak.firebaseapp.com",
  databaseURL: "https://task-manager-ak-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-manager-ak",
  storageBucket: "task-manager-ak.appspot.com",
  messagingSenderId: "137308495914",
  appId: "1:137308495914:web:ef5b6d81df8f7b9b83e353",
  measurementId: "G-3Z08MYD81F"
};

initializeApp(firebaseConfig);


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
  }
