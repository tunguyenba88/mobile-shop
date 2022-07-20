import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //v9
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCuWNlm6aZjk34Yb_NxJY575qYWFBlgfe8',
  authDomain: 'mobile-shop-3c565.firebaseapp.com',
  projectId: 'mobile-shop-3c565',
  storageBucket: 'mobile-shop-3c565.appspot.com',
  messagingSenderId: '870297895528',
  appId: '1:870297895528:web:2e60a93ed876a6fa9971dd',
  measurementId: 'G-FRJKMPK55L',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
