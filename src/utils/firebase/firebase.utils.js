import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxZOzdXaBoib7U94yFyAQy0PGjozIU68Q",
  authDomain: "crwn-db-cde86.firebaseapp.com",
  projectId: "crwn-db-cde86",
  storageBucket: "crwn-db-cde86.appspot.com",
  messagingSenderId: "522003773345",
  appId: "1:522003773345:web:470c4ecf7de9e13ff8fde0",
  measurementId: "G-SX5KN1G75Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
