/**
 * Modal genérico reutilizable
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {function} onClose - Función para cerrar el modal
 * @param {string} title - Título del modal
 * @param {ReactNode} children - Contenido del modal
 */
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-dark-card rounded-3xl w-[90%] max-w-lg max-h-[80vh] overflow-y-auto m-4 shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal