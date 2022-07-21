import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBLFJabCnaDiMX6nPUSfjkhoStcZIQwB68",
    authDomain: "clone-2a2ee.firebaseapp.com",
    projectId: "clone-2a2ee",
    storageBucket: "clone-2a2ee.appspot.com",
    messagingSenderId: "410390006590",
    appId: "1:410390006590:web:a41d09bd92c963b1d17a6f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };