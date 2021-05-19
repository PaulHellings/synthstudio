import firebase from 'firebase/app';
import 'firebase/firestore';

// TODO: create documentation for adding a firebase db for this site

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: 'AIzaSyBxJkN4yfYd2KFVyTd4xjrZyWUDLMZ3t60',
  authDomain: 'synthstudio-4f094.firebaseapp.com',
  projectId: 'synthstudio-4f094',
  storageBucket: 'synthstudio-4f094.appspot.com',
  messagingSenderId: '40308285406',
  appId: '1:40308285406:web:bf26ed73eb0dd55f5b074f',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;