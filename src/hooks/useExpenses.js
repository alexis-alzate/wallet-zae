import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase.js'

/**
 * Hook para manejar gastos con Firebase
 */
export function useExpenses(userId, month) {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId || !month) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Query de Firestore
      const expensesRef = collection(db, 'expenses')
      const q = query(
        expensesRef,
        where('userId', '==', userId),
        where('month', '==', month),
        orderBy('date', 'desc')
      )

      // Listener en tiempo real
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const expensesData = []
          snapshot.forEach((doc) => {
            expensesData.push({
              id: doc.id,
              ...doc.data()
            })
          })
          setExpenses(expensesData)
          setLoading(false)
        },
        (err) => {
          console.error('Error al obtener gastos:', err)
          setError(err.message)
          setLoading(false)
        }
      )

      // Cleanup
      return () => unsubscribe()
    } catch (err) {
      console.error('Error al configurar listener:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [userId, month])

  /**
   * Agregar gasto
   */
  const addExpense = async (expenseData) => {
    try {
      const expensesRef = collection(db, 'expenses')
      
      const newExpense = {
        ...expenseData,
        userId,
        month,
        createdAt: serverTimestamp()
      }

      await addDoc(expensesRef, newExpense)
      
      return { success: true }
    } catch (err) {
      console.error('Error al agregar gasto:', err)
      return { success: false, error: err.message }
    }
  }

  /**
   * Eliminar gasto
   */
  const deleteExpense = async (expenseId) => {
    try {
      const expenseRef = doc(db, 'expenses', expenseId)
      await deleteDoc(expenseRef)
      
      return { success: true }
    } catch (err) {
      console.error('Error al eliminar gasto:', err)
      return { success: false, error: err.message }
    }
  }

  return {
    expenses,
    loading,
    error,
    addExpense,
    deleteExpense
  }
}
