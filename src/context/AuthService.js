import { auth, firestore } from './firebase.js';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const signUp = async (email, password, userName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await sendEmailVerification(user);

  return user; 
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user.emailVerified) {
      // User's email is verified
      console.log('Email is verified');
      return true; // Indicate successful sign-in with verified email
    } else {
      // User's email is not verified
      console.log('Please verify your email first.');
      return false; // Indicate sign-in failure due to unverified email
    }
  } catch (error) {
    // Handle possible errors, such as wrong password, user not found, etc.
    console.error("Error signing in:", error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    // Optionally add/update user details in Firestore
    await setDoc(doc(firestore, "users", user.uid), {
      userName: user.displayName, // Or any other username logic you want
      email: user.email
    }, { merge: true }); // Merge true to avoid overwriting existing fields other than userName and email

    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

const logOut = () => {
  localStorage.clear();
  return signOut(auth);
};

export { signUp, signIn, googleSignUp, logOut };
