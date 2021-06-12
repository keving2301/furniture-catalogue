import firebase from "firebase";
require("firebase/firestore");

// Initialize Firebase

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQ0pfKZAgX4jwTXfmh-7bBVWrc5OYAPTA",
    authDomain: "furniture-catalogue-01.firebaseapp.com",
    databaseURL: "https://furniture-catalogue-01-default-rtdb.firebaseio.com",
    projectId: "furniture-catalogue-01",
    storageBucket: "furniture-catalogue-01.appspot.com",
    messagingSenderId: "545417372174",
    appId: "1:545417372174:web:75602c93fb8577a76b925f",
    measurementId: "G-P3G897RXHT"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

export {fb,db, storage};
