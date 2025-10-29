import { useState } from 'react'
import { useNotifications } from '../hooks/useNotifications'
import { useExpenses } from '../hooks/useExpenses'
import { getCurrentMonth } from '../utils/dateHelpers'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import PageContainer from '../components/layout/PageContainer'
import EmptyState from '../components/layout/EmptyState'
import NotificationItem from '../components/ui/NotificationItem'
import Button from '../components/ui/Button'

/**
 * Página de Notificaciones
 */
function Notifications({ onNavigate, user }) {
  const [activeTab, setActiveTab] = useState('notifications')
  
  // Obtener gastos para generar notificaciones
  const { expenses } = useExpenses(user?.uid, getCurrentMonth())
  
  // Hook de notificaciones
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  } = useNotifications(user?.uid, expenses)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    onNavigate(tab)
  }

  return (
    <PageContainer hasBottomNav>
      <Header userName={user?.name || 'Usuario'} />
      
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-adaptive">
              Notificaciones
            </h1>
            {unreadCount > 0 && (
              <p className="text-text-secondary text-sm mt-1">
                {unreadCount} sin leer
              </p>
            )}
          </div>

          {/* Botones de acción */}
          {notifications.length > 0 && (
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-primary-yellow text-sm hover:underline"
                >
                  Marcar todas
                </button>
              )}
              <button
                onClick={clearAll}
                className="text-red-500 text-sm hover:underline"
              >
                Limpiar
              </button>
            </div>
          )}
        </div>

        {/* Lista de notificaciones */}
        {notifications.length === 0 ? (
          <EmptyState
            icon="🔔"
            title="No hay notificaciones"
            description="Te avisaremos sobre tus finanzas, presupuestos y logros"
          />
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onRemove={removeNotification}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </PageContainer>
  )
}

export default Notifications