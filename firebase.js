// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA8Ug2rseoXjMf1y_TLBBZS06xEUC0h0Kk',
  authDomain: 'docs-clone-03-02-22.firebaseapp.com',
  projectId: 'docs-clone-03-02-22',
  storageBucket: 'docs-clone-03-02-22.appspot.com',
  messagingSenderId: '837759271211',
  appId: '1:837759271211:web:2c1e99064d17ccd122856e',
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

const firebaseClient = {
  db,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
}
export { firebaseClient, db }
