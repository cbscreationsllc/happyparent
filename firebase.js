import { connectFunctionsEmulator, getFunctions } from "@firebase/functions";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore";
import { getAuth, connectAuthEmulator } from "@firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app;
let db;
let auth;
let functions;
if (process.env.NODE_ENV === "production") {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  functions = getFunctions(app);
  auth = getAuth();
}

if (process.env.NODE_ENV === "development") {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth();
  functions = getFunctions(app);
  connectFirestoreEmulator(db, "10.0.0.222", 9017);
  connectFunctionsEmulator(functions, "10.0.0.222", 5001);
  connectAuthEmulator(auth, "http://10.0.0.222:9099", {
    disableWarnings: true,
  });
}

export { db, auth };
