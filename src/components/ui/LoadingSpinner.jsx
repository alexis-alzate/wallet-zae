/**
 * Spinner de carga
 * @param {string} size - Tamaño ('sm' | 'md' | 'lg')
 */
function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  }
  
  return (
    <div className="flex justify-center items-center">
      <div
        className={`
          ${sizes[size]}
          border-primary-yellow border-t-transparent
          rounded-full animate-spin
        `}
      />
    </div>
  )
}

export default LoadingSpinner