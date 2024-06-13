// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh3f1adMGTH2UCTBbXbC-iPf7P-A3lt9c",
  authDomain: "elesismailov-com-15787.firebaseapp.com",
  projectId: "elesismailov-com-15787",
  storageBucket: "elesismailov-com-15787.appspot.com",
  messagingSenderId: "558899600669",
  appId: "1:558899600669:web:e05041fccd6c1fe36155f4",
  measurementId: "G-N45T18MNL4"
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, storage, db }; 

