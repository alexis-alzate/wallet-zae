/**
 * Estado vacío genérico
 * Para cuando no hay datos que mostrar
 * @param {string} icon - Emoji o icono
 * @param {string} title - Título
 * @param {string} description - Descripción
 * @param {ReactNode} action - Botón o acción (opcional)
 */
function EmptyState({ 
  icon = '📭', 
  title = 'No hay datos', 
  description = '',
  action 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-6xl mb-4">{icon}</span>
      <h3 className="text-xl font-medium text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-text-secondary text-sm mb-6 max-w-sm">
          {description}
        </p>
      )}
      {action && action}
    </div>
  )
}

export default EmptyState