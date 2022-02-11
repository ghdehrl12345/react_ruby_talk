import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBIAekIq-T9JYSHN7UmTEKkkrs7BHTTgi4",
  authDomain: "edu-fileserver-9dbd8.firebaseapp.com",
  projectId: "edu-fileserver-9dbd8",
  storageBucket: "edu-fileserver-9dbd8.appspot.com",
  messagingSenderId: "715946731337",
  appId: "1:715946731337:web:933c5a1f2b782fe0441c98",
  measurementId: "G-S1PP3K75P6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const storageRef = storage.ref();

export default storageRef;
