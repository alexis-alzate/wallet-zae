import { formatDate } from '../../utils/formatters'

/**
 * Item de notificación individual
 */
function NotificationItem({ notification, onMarkAsRead, onRemove }) {
  const typeColors = {
    alert: 'bg-red-500/10 border-red-500',
    warning: 'bg-yellow-500/10 border-yellow-500',
    info: 'bg-blue-500/10 border-blue-500',
    insight: 'bg-purple-500/10 border-purple-500',
    achievement: 'bg-green-500/10 border-green-500',
    reminder: 'bg-gray-500/10 border-gray-500'
  }

  return (
    <div 
      className={`
        ${typeColors[notification.type]} 
        border rounded-xl p-4 
        ${!notification.read ? 'bg-opacity-100' : 'opacity-60'}
        transition-all
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icono */}
        <span className="text-2xl">{notification.icon}</span>

        {/* Contenido */}
        <div className="flex-1">
          <h3 className="text-white font-medium mb-1">
            {notification.title}
          </h3>
          <p className="text-text-secondary text-sm mb-2">
            {notification.message}
          </p>
          <p className="text-text-tertiary text-xs">
            {formatDate(notification.timestamp, 'short')}
          </p>
        </div>

        {/* Acciones */}
        <div className="flex gap-2">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-primary-yellow text-xs hover:underline"
            >
              Marcar leída
            </button>
          )}
          <button
            onClick={() => onRemove(notification.id)}
            className="text-text-tertiary hover:text-red-500 text-xs"
          >
            ✕
            </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationItem