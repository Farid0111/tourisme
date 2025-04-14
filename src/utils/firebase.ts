import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuration Firebase (à remplacer par vos propres identifiants)
const firebaseConfig = {
  apiKey: "AIzaSyB9uWscwgcxG-Db-SwT-wy8JHg6AjHLdow",
  authDomain: "fahdbot-ace64.firebaseapp.com",
  databaseURL: "https://fahdbot-ace64.firebaseio.com",
  projectId: "fahdbot-ace64",
  storageBucket: "fahdbot-ace64.firebasestorage.app",
  messagingSenderId: "887889305859",
  appId: "1:887889305859:web:e88ef0bd18bc513f924936",
  measurementId: "G-6GT7FNRB4R"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Services Firebase que nous utilisons
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app; 