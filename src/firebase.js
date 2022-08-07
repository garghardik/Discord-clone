import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { onSnapshot, collection, addDoc, doc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIhbo7jygzNqyqajGVZ4MJIIEaVqt5Wn0",
    authDomain: "discord-clone-65c98.firebaseapp.com",
    projectId: "discord-clone-65c98",
    storageBucket: "discord-clone-65c98.appspot.com",
    messagingSenderId: "1001381276320",
    appId: "1:1001381276320:web:0dfbc380cd894bcb46b7c5"
  };

 
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {onSnapshot, collection, addDoc, doc ,signInWithPopup};
export {auth, provider};
export default db;

