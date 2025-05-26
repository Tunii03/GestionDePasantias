import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqOWI2ZzYKWDngUgauLGGkPnwGF3cE9zY",
  authDomain: "gestiondepasantias.firebaseapp.com",
  projectId: "gestiondepasantias",
  storageBucket: "gestiondepasantias.firebasestorage.app",
  messagingSenderId: "388202684594",
  appId: "1:388202684594:web:83b64b2a80179c002129ab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
