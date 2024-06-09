import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCD2EgyM_Rckze-XNFZ8txHEbIFmKi3sHY",
    authDomain: "farmtech-171fb.firebaseapp.com",
    projectId: "farmtech-171fb",
    storageBucket: "farmtech-171fb.appspot.com",
    messagingSenderId: "790800003002",
    appId: "1:790800003002:web:84d96dae4733725de77783",
    measurementId: "G-5N2LHNMX6M"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app); // Access auth service
  const firestore = getFirestore(app); // Access firestore service

// Now you can access auth and firestore
export { auth, firestore };
