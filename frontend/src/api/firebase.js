import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
export let auth;
const googleProvider = new GoogleAuthProvider();

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    console.warn("Firebase configuration is missing in .env file. Authentication will not work.");
  }
} catch (error) {
  console.error("Firebase initialization error", error);
}

export const signInWithGoogle = async () => {
  if (!auth) throw new Error("Firebase is not initialized. Please check your .env configuration.");
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    return idToken;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

