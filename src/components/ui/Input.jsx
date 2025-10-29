/**
 * Input genérico reutilizable
 * @param {string} label - Etiqueta del input
 * @param {string} type - Tipo de input ('text' | 'number' | 'email' | 'password')
 * @param {string} value - Valor del input
 * @param {function} onChange - Función al cambiar el valor
 * @param {string} placeholder - Placeholder
 * @param {string} error - Mensaje de error
 * @param {boolean} required - Si es requerido
 * @param {string} icon - Emoji o icono
 */
function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  icon = ''
}) {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* Input container */}
      <div className="relative">
        {/* Icono */}
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
            {icon}
          </span>
        )}
        
        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full bg-dark-card text-white rounded-xl px-4 py-3
            ${icon ? 'pl-12' : ''}
            border-2 transition-colors
            ${error ? 'border-red-500' : 'border-dark-border focus:border-primary-yellow'}
            placeholder:text-text-tertiary
            outline-none
          `}
        />
      </div>
      
      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input