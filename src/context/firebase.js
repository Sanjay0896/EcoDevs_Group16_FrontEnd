import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAji9-pq4YVsmTo0Aylhasz-1PX-vm7rho",
  authDomain: "ecodevs-c6fd3.firebaseapp.com",
  projectId: "ecodevs-c6fd3",
  storageBucket: "ecodevs-c6fd3.appspot.com",
  messagingSenderId: "235903549957",
  appId: "1:235903549957:web:79fafb90161046d954526c",
  measurementId: "G-5JZVFSSJZG"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

export { auth, firestore };
