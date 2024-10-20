// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE15fmQVgYOFSjJfmB6Yj9T4bWT3-9Y34",
  authDomain: "jukebox-62463.firebaseapp.com",
  projectId: "jukebox-62463",
  storageBucket: "jukebox-62463.appspot.com",
  messagingSenderId: "296566044882",
  appId: "1:296566044882:web:71a96134d10b11c671d50b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
