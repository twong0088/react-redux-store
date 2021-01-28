import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCG0nzF2TuXSxHawG-1CKyGHqNu8VE-kP8",
  authDomain: "curieai.firebaseapp.com",
  projectId: "curieai",
  storageBucket: "curieai.appspot.com",
  messagingSenderId: "877392170014",
  appId: "1:877392170014:web:1da684ef1f2be89656320f"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;