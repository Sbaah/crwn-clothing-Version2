import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
const firebaseApp  = initializeApp(firebaseConfig);

// get google instance  
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};


// Is a signleton
export const auth = getAuth();


export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth, provider);

//  dat
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // use the user's uid to get a document refernce 
  const userDocRef = doc(db, 'users', userAuth.uid);

  

  const userSnapshot = await getDoc(userDocRef);

// if check id user data exists
// create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email,emailVerified } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        emailVerified
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // if exists return it.
  return userDocRef;
};

//  interface/helper layer functions 
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async()=>{signOut(auth)};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);