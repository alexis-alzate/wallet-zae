/**
 * Botón flotante principal (FAB - Floating Action Button)
 * @param {function} onClick - Función al hacer click
 * @param {string} label - Texto del botón
 * @param {string} icon - Icono del botón
 */
function FloatingButton({ onClick, label = "Agregar Gasto", icon = "+" }) {
  return (
    <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
      <button
        onClick={onClick}
        className="w-full bg-primary-yellow text-dark-bg font-semibold text-base py-4 rounded-full shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </button>
    </div>
  )
}

export default FloatingButton