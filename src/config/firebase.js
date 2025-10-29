import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Tu configuración de Firebase
// REEMPLAZA con tus datos reales de Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBVLSHwxth3ZybWiDhWunJlgWa1yEwCI4U",
  authDomain: "wallert-finance.firebaseapp.com",
  projectId: "wallert-finance",
  storageBucket: "wallert-finance.firebasestorage.app",
  messagingSenderId: "873440520623",
  appId: "1:873440520623:web:42d54106e0cad6093e675a"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Servicios
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app