// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxnGsGiScYOGE2XbAj-rbr1UW26L6x_Ik",
  authDomain: "creaciones-e-insumos-klonice.firebaseapp.com",
  projectId: "creaciones-e-insumos-klonice",
  storageBucket: "creaciones-e-insumos-klonice.appspot.com",
  messagingSenderId: "801057345622",
  appId: "1:801057345622:web:5e97a29db30f9e5aa42bf7",
  measurementId: "G-ZS8K8S7K0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)