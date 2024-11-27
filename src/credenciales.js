// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importar getAuth para manejar la autenticación
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxnGsGiScYOGE2XbAj-rbr1UW26L6x_Ik",
  authDomain: "creaciones-e-insumos-klonice.firebaseapp.com",
  projectId: "creaciones-e-insumos-klonice",
  storageBucket: "creaciones-e-insumos-klonice.appspot.com",
  messagingSenderId: "801057345622",
  appId: "1:801057345622:web:5e97a29db30f9e5aa42bf7",
  measurementId: "G-ZS8K8S7K0V"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const appFirebase = initializeApp(firebaseConfig);
// Exportar Firestore y Auth para usarlos en el proyecto
export const db = getFirestore(app);
export const auth = getAuth(app); // Agregar esta línea para inicializar y exportar auth
export default appFirebase;