import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAEqMFjCEo3TqvW35uZxU1hktNU0HSaFhk",
    authDomain: "insta-clone-react-1eb24.firebaseapp.com",
    databaseURL: "https://insta-clone-react-1eb24-default-rtdb.firebaseio.com",
    projectId: "insta-clone-react-1eb24",
    storageBucket: "insta-clone-react-1eb24.appspot.com",
    messagingSenderId: "38265604437",
    appId: "1:38265604437:web:6d4e053165f5a153d507dc",
    measurementId: "G-WNYR2TBEHB"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export { db, auth, storage };