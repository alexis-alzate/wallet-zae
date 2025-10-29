/**
 * Contenedor principal de páginas
 * Maneja padding para bottom nav y botón flotante
 * @param {boolean} hasBottomNav - Si la página tiene navegación inferior
 * @param {boolean} hasFloatingButton - Si la página tiene botón flotante
 * @param {ReactNode} children - Contenido de la página
 */
function PageContainer({ 
  children, 
  hasBottomNav = false, 
  hasFloatingButton = false 
}) {
  // Calcular padding bottom según los elementos fijos
  const getPaddingBottom = () => {
    if (hasBottomNav && hasFloatingButton) {
      return 'pb-32' // Bottom nav (64px) + Floating button (64px)
    }
    if (hasBottomNav) {
      return 'pb-20' // Solo bottom nav (80px)
    }
    if (hasFloatingButton) {
      return 'pb-24' // Solo floating button (96px)
    }
    return 'pb-4' // Padding normal
  }

  return (
    <div className={`min-h-screen bg-dark-bg ${getPaddingBottom()}`}>
      {children}
    </div>
  )
}

export default PageContainer
