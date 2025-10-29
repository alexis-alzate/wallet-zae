/**
 * Botón genérico reutilizable
 * @param {string} children - Texto del botón
 * @param {function} onClick - Función al hacer click
 * @param {string} variant - Variante del botón ('primary' | 'secondary' | 'danger')
 * @param {string} size - Tamaño ('sm' | 'md' | 'lg')
 * @param {boolean} fullWidth - Si ocupa todo el ancho
 * @param {boolean} disabled - Si está deshabilitado
 */
function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button'
}) {
  // Estilos base
  const baseStyles = 'font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  
  // Estilos por variante
  const variants = {
    primary: 'bg-primary-yellow text-dark-bg hover:bg-primary-yellow-dark',
    secondary: 'bg-dark-card text-white border-2 border-dark-border hover:border-primary-yellow',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }
  
  // Estilos por tamaño
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  // Combinar estilos
  const className = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
  `.trim()
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}

export default Button