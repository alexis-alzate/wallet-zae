import { useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase.js'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Intentar obtener datos del usuario
          const userDocRef = doc(db, 'users', firebaseUser.uid)
          const userDoc = await getDoc(userDocRef)
          
          if (userDoc.exists()) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data()
            })
          } else {
            // Si no existe el documento, crear uno básico
            const userData = {
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
              email: firebaseUser.email,
              monthlyIncome: 3000000,
              monthlySavings: 500000,
              createdAt: new Date().toISOString()
            }
            
            await setDoc(userDocRef, userData)
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userData
            })
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error)
          // Si falla, usar datos básicos de Firebase Auth
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
            monthlyIncome: 3000000,
            monthlySavings: 500000
          })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  /**
   * Login con email y contraseña
   */
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      let errorMessage = 'Error al iniciar sesión'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido'
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Credenciales inválidas'
      }
      
      return { success: false, error: errorMessage }
    }
  }

  /**
   * Registro con email y contraseña
   */
  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Actualizar perfil con nombre
      await updateProfile(userCredential.user, {
        displayName: name
      })
      
      // Crear documento en Firestore
      const userData = {
        name: name,
        email: email,
        monthlyIncome: 3000000,
        monthlySavings: 500000,
        createdAt: new Date().toISOString()
      }
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userData)
      
      return { success: true, user: userCredential.user }
    } catch (error) {
      console.error('Error al registrar:', error)
      let errorMessage = 'Error al crear la cuenta'
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo ya está registrado'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido'
      }
      
      return { success: false, error: errorMessage }
    }
  }

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      return { success: false, error: 'Error al cerrar sesión' }
    }
  }

  /**
   * Recuperar contraseña
   */
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (error) {
      console.error('Error al enviar correo:', error)
      let errorMessage = 'Error al enviar el correo'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No existe una cuenta con este correo'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido'
      }
      
      return { success: false, error: errorMessage }
    }
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword
  }
}