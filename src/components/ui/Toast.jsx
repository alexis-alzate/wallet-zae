import { useEffect } from 'react'

/**
 * Notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo ('success' | 'error' | 'info')
 * @param {boolean} isVisible - Si está visible
 * @param {function} onClose - Función para cerrar
 * @param {number} duration - Duración en ms (default: 3000)
 */
function Toast({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose,
  duration = 3000 
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])
  
  if (!isVisible) return null
  
  const types = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }
  
  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  }
  
  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-center">
      <div className={`
        ${types[type]}
        text-white px-6 py-3 rounded-xl shadow-lg
        flex items-center gap-3
        animate-fade-in
      `}>
        <span className="text-xl">{icons[type]}</span>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}

export default Toast