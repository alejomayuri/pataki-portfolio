// src/lib/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp, } from "firebase/firestore";
import { app } from "./firebase";

const auth = getAuth(app);
const db = getFirestore(app);

// Registro con email y contraseña
export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  await setDoc(doc(db, "usuarios", uid), {
    email: email,
    createdAt: serverTimestamp(),
    portfolio: {},
  });

  return userCredential;
};

// Login con Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userDocRef = doc(db, "usuarios", user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    await setDoc(userDocRef, {
      email: user.email,
      createdAt: serverTimestamp(),
      portfolio: {},
    });
  }

  return user;
};

// Login con email y contraseña
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = () => {
  return signOut(auth);
};

export default auth;
