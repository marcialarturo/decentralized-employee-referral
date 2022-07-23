// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAUrEQtV7qcP8dpqIuAdnWQ0ZjZmN8L4FQ',
  authDomain: 'employment-references.firebaseapp.com',
  projectId: 'employment-references',
  storageBucket: 'employment-references.appspot.com',
  messagingSenderId: '776543365201',
  appId: '1:776543365201:web:d40cbb877475bcdf443070',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
