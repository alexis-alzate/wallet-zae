import { useState, useEffect } from 'react'

/**
 * Hook para manejar notificaciones inteligentes
 */
export function useNotifications(userId, expenses = []) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!userId || !expenses) return

    // Generar notificaciones basadas en los datos
    const generatedNotifications = generateNotifications(expenses)
    setNotifications(generatedNotifications)
    
    // Contar no leídas
    const unread = generatedNotifications.filter(n => !n.read).length
    setUnreadCount(unread)
  }, [userId, expenses.length]) // ✅ CAMBIO: usa expenses.length en vez de expenses

  const generateNotifications = (expenses) => {
    const notifs = []
    
    // Notificaciones básicas
    if (expenses.length > 0) {
      const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
      
      if (totalSpent > 2000000) {
        notifs.push({
          id: 'high-spending',
          type: 'insight',
          icon: '📊',
          title: 'Gastos altos este mes',
          message: `Has gastado $${(totalSpent / 1000000).toFixed(1)}M este mes`,
          timestamp: new Date().toISOString(),
          read: false,
          priority: 'low'
        })
      }
    }

    return notifs
  }

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const clearAll = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  }
}