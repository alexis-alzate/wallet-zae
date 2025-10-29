/**
 * Navegación inferior de la aplicación
 * @param {string} activeTab - Tab activo ('dashboard' | 'transactions' | 'statistics' | 'settings')
 * @param {function} onTabChange - Función al cambiar de tab
 */
function BottomNav({ activeTab = 'dashboard', onTabChange }) {
  const tabs = [
    { id: 'dashboard', icon: '≡', label: 'Inicio' },
    { id: 'transactions', icon: '💰', label: 'Gastos' },
    { id: 'statistics', icon: '📊', label: 'Stats' },
    { id: 'settings', icon: '⚙️', label: 'Ajustes' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border z-50 safe-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex flex-col items-center justify-center w-full h-full
              transition-all duration-200
              ${activeTab === tab.id 
                ? 'text-primary-yellow scale-105' 
                : 'text-text-secondary hover:text-text-primary'
              }
            `}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs font-light">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav