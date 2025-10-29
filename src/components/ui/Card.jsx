/**
 * Card genérico reutilizable
 * @param {ReactNode} children - Contenido del card
 * @param {function} onClick - Función al hacer click (opcional)
 * @param {string} className - Clases adicionales
 */
function Card({ children, onClick, className = '' }) {
  const isClickable = typeof onClick === 'function'
  
  return (
    <div
      onClick={onClick}
      className={`
        bg-dark-card rounded-2xl p-4 shadow-card
        ${isClickable ? 'cursor-pointer hover:bg-dark-card-light transition-colors' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card