import NotificationBadge from '../ui/NotificationBadge'

/**
 * Header principal con notificaciones
 */
function Header({ userName = 'Usuario', onMenuClick, unreadCount = 0, onNotificationsClick }) {
  return (
    <header className="bg-dark-card pt-12 pb-6 px-5 safe-top">
      <div className="flex items-center justify-between mb-4">
        {/* Botón de menú */}
        <button 
          onClick={onMenuClick}
          className="text-white hover:text-primary-yellow transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Título */}
        <div className="text-center">
          <h1 className="text-lg font-semibold text-white tracking-wide">
            FINANZAS 360°
          </h1>
        </div>
        
        {/* Notificaciones + Avatar */}
        <div className="flex items-center gap-3">
          {/* Botón de notificaciones */}
          <button
            onClick={onNotificationsClick}
            className="relative text-white hover:text-primary-yellow transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <NotificationBadge count={unreadCount} />
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center shadow-lg">
            <span className="text-dark-bg font-bold text-sm">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Saludo */}
      <div className="text-white">
        <p className="text-sm text-text-secondary">
          Hola, <span className="font-medium text-white">{userName}</span>
        </p>
      </div>
    </header>
  )
}

export default Header