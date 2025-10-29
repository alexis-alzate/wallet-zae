import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase.js'

/**
 * Hook para manejar cuentas
 */
export function useAccounts(userId) {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const accountsRef = collection(db, 'accounts')
    const q = query(
      accountsRef,
      where('userId', '==', userId)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const accountsData = []
      let total = 0

      snapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        }
        accountsData.push(data)
        total += data.balance || 0
      })

      setAccounts(accountsData)
      setTotalBalance(total)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userId])

  /**
   * Agregar cuenta
   */
  const addAccount = async (accountData) => {
    try {
      const accountsRef = collection(db, 'accounts')
      
      const newAccount = {
        ...accountData,
        userId,
        balance: accountData.initialBalance || 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      await addDoc(accountsRef, newAccount)
      
      return { success: true }
    } catch (err) {
      console.error('Error al agregar cuenta:', err)
      return { success: false, error: err.message }
    }
  }

  /**
   * Actualizar saldo de cuenta
   */
  const updateAccountBalance = async (accountId, newBalance) => {
    try {
      const accountRef = doc(db, 'accounts', accountId)
      
      await updateDoc(accountRef, {
        balance: newBalance,
        updatedAt: serverTimestamp()
      })
      
      return { success: true }
    } catch (err) {
      console.error('Error al actualizar saldo:', err)
      return { success: false, error: err.message }
    }
  }

  /**
   * Eliminar cuenta
   */
  const deleteAccount = async (accountId) => {
    try {
      const accountRef = doc(db, 'accounts', accountId)
      await deleteDoc(accountRef)
      
      return { success: true }
    } catch (err) {
      console.error('Error al eliminar cuenta:', err)
      return { success: false, error: err.message }
    }
  }

  return {
    accounts,
    totalBalance,
    loading,
    addAccount,
    updateAccountBalance,
    deleteAccount
  }
}
