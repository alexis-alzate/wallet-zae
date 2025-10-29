import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useBiometrics } from '../hooks/useBiometrics'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Toast from '../components/ui/Toast'

/**
 * Página de Configuración
 * Con modo oscuro/claro y biometría
 */
function Settings({ onNavigate, user, onLogout }) {
  const [activeTab, setActiveTab] = useState('settings')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Hooks de tema y biometría
  const { theme, isDark, toggleTheme } = useTheme()
  const { biometricsEnabled, biometricsAvailable, toggleBiometrics } = useBiometrics()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    onNavigate(tab)
  }

  const handleLogout = () => {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
      onLogout()
    }
  }

  const handleToggleTheme = () => {
    toggleTheme()
    setToastMessage(isDark ? 'Tema claro activado' : 'Tema oscuro activado')
    setShowToast(true)
  }

  const handleToggleBiometrics = async () => {
    const result = await toggleBiometrics()
    if (result.success) {
      setToastMessage(result.message)
      setShowToast(true)
    }
  }

  // Opciones de configuración
  const sections = [
    {
      title: 'Apariencia',
      options: [
        {
          id: 'theme',
          icon: isDark ? '🌙' : '☀️',
          label: isDark ? 'Modo oscuro' : 'Modo claro',
          description: 'Cambiar tema de la aplicación',
          action: handleToggleTheme,
          hasToggle: true,
          toggleValue: isDark
        }
      ]
    },
    {
      title: 'Seguridad',
      options: [
        {
          id: 'biometrics',
          icon: '🔐',
          label: 'Autenticación biométrica',
          description: biometricsAvailable 
            ? 'Desbloquear con huella o Face ID' 
            : 'No disponible en este dispositivo',
          action: biometricsAvailable ? handleToggleBiometrics : null,
          hasToggle: biometricsAvailable,
          toggleValue: biometricsEnabled,
          disabled: !biometricsAvailable
        }
      ]
    },
    {
      title: 'General',
      options: [
        {
          id: 'profile',
          icon: '👤',
          label: 'Perfil',
          description: 'Editar información personal',
          action: () => alert('Perfil - Próximamente')
        },
        {
          id: 'categories',
          icon: '🏷️',
          label: 'Categorías',
          description: 'Personalizar categorías de gastos',
          action: () => alert('Categorías - Próximamente')
        },
        {
          id: 'budgets',
          icon: '🎯',
          label: 'Presupuestos',
          description: 'Configurar límites de gasto',
          action: () => alert('Presupuestos - Próximamente')
        },
        {
          id: 'notifications',
          icon: '🔔',
          label: 'Notificaciones',
          description: 'Gestionar alertas y recordatorios',
          action: () => alert('Notificaciones - Próximamente')
        },
        {
          id: 'export',
          icon: '📤',
          label: 'Exportar datos',
          description: 'Descargar tu información',
          action: () => alert('Exportar - Próximamente')
        }
      ]
    }
  ]

  return (
    <PageContainer hasBottomNav>
      <Header userName={user?.name || 'Usuario'} />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-adaptive mb-2">
          Configuración
        </h1>
        <p className="text-secondary-adaptive text-sm mb-6">
          Personaliza tu experiencia
        </p>

        {/* Secciones de configuración */}
        <div className="space-y-6 mb-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-text-secondary text-xs font-semibold uppercase mb-3">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.options.map((option) => (
                  <Card
                    key={option.id}
                    onClick={option.action}
                    className={`flex items-center justify-between ${
                      option.disabled ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <p className="text-adaptive font-medium">{option.label}</p>
                        <p className="text-secondary-adaptive text-xs mt-0.5">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    {/* Toggle switch o flecha */}
                    {option.hasToggle ? (
                      <div 
                        className={`
                          w-12 h-6 rounded-full transition-colors relative
                          ${option.toggleValue ? 'bg-primary-yellow' : 'bg-gray-400'}
                        `}
                      >
                        <div className={`
                          absolute top-1 left-1 w-4 h-4 rounded-full bg-white
                          transition-transform
                          ${option.toggleValue ? 'translate-x-6' : 'translate-x-0'}
                        `} />
                      </div>
                    ) : !option.disabled && (
                      <svg className="w-5 h-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Botón de logout */}
        <Button
          variant="danger"
          fullWidth
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>

        {/* Versión */}
        <p className="text-text-tertiary text-xs text-center mt-6">
          Finanzas 360° v1.0.0
        </p>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Toast */}
      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </PageContainer>
  )
}

export default Settings
