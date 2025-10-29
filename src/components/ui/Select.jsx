/**
 * Select genérico reutilizable
 * @param {string} label - Etiqueta del select
 * @param {string} value - Valor seleccionado
 * @param {function} onChange - Función al cambiar el valor
 * @param {Array} options - Array de opciones [{value, label, icon}]
 * @param {string} error - Mensaje de error
 * @param {boolean} required - Si es requerido
 */
function Select({
  label,
  value,
  onChange,
  options = [],
  error = '',
  required = false
}) {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* Select */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full bg-dark-card text-white rounded-xl px-4 py-3
          border-2 transition-colors
          ${error ? 'border-red-500' : 'border-dark-border focus:border-primary-yellow'}
          outline-none cursor-pointer
        `}
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.icon && `${option.icon} `}{option.label}
          </option>
        ))}
      </select>
      
      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  )
}

export default Select