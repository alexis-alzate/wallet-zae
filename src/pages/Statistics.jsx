import { useState } from 'react'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import PageContainer from '../components/layout/PageContainer'
import EmptyState from '../components/layout/EmptyState'

/**
 * Página de Estadísticas
 */
function Statistics({ onNavigate, user }) {
  const [activeTab, setActiveTab] = useState('statistics')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    onNavigate(tab)
  }

  return (
    <PageContainer hasBottomNav>
      <Header userName={user?.name || 'Usuario'} />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Estadísticas
        </h1>
        <p className="text-text-secondary text-sm mb-6">
          Análisis detallado de tus finanzas
        </p>

        {/* Estado vacío temporal */}
        <EmptyState
          icon="📊"
          title="Estadísticas y gráficas"
          description="Aquí verás análisis detallados, tendencias y comparaciones"
        />
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </PageContainer>
  )
}

export default Statistics