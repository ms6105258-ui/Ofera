// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFh7H8hXf7N3gGQi1kQqOQUYExpW2Rckk",
  authDomain: "oferaapp.firebaseapp.com",
  projectId: "oferaapp",
  storageBucket: "oferaapp.firebasestorage.app",
  messagingSenderId: "153411623881",
  appId: "1:153411623881:web:55aaff6f97166d23b8e618",
  measurementId: "G-HM4KGPD17M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
