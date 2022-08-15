import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'


// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUjdAXYBXmIi-agjY2Gj6Dde2OSV6-O-E",
  authDomain: "expanded-augury-354118.firebaseapp.com",
  projectId: "expanded-augury-354118",
  storageBucket: "expanded-augury-354118.appspot.com",
  messagingSenderId: "189653321935",
  appId: "1:189653321935:web:a2e7fc9612947253af4fba",
  measurementId: "G-6E2BQ5WC9V"
};

//intailise the firebase application 
export default firebase.initializeApp(firebaseConfig); 