import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdf3Iy7kZJTHk5dPueBc7JHesi-MqmcYA",
  authDomain: "fir-auth-31a8d.firebaseapp.com",
  projectId: "fir-auth-31a8d",
  storageBucket: "fir-auth-31a8d.appspot.com",
  messagingSenderId: "107699818614",
  appId: "1:107699818614:web:aac4ce0009efc489164f57",
  databaseURL: 'https://fir-auth-31a8d-default-rtdb.firebaseio.com'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

 

export default app;
