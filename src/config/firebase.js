// Import the functions you need from the SDKs you need
const firebase = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrDT-zNBB-GHpuOFngU8GmJbARIne4ogA",
  authDomain: "backend-project-break.firebaseapp.com",
  projectId: "backend-project-break",
  storageBucket: "backend-project-break.appspot.com",
  messagingSenderId: "6049101173",
  appId: "1:6049101173:web:26a258a1a25d4927478f3c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

module.exports = app;