// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNgAnJki9b0eArTyCDnWtphroboaku9nY",
  authDomain: "genai-c042c.firebaseapp.com",
  projectId: "genai-c042c",
  storageBucket: "genai-c042c.firebasestorage.app",
  messagingSenderId: "362613125112",
  appId: "1:362613125112:web:26e97da15278558e92300d",
  measurementId: "G-K3ZBX3FWH0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };