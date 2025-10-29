import { useState } from 'react'
import { getCurrentMonth, monthToReadable } from '../utils/dateHelpers'
import { useExpenses } from '../hooks/useExpenses'
import { formatCurrency, formatDate } from '../utils/formatters'
import Header from '../components/layout/Header'
import BottomNav from '../components/layout/BottomNav'
import PageContainer from '../components/layout/PageContainer'
import EmptyState from '../components/layout/EmptyState'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Card from '../components/ui/Card'

/**
 * Página de Transacciones/Historial
 * Muestra todos los gastos del mes con datos reales
 */
function Transactions({ onNavigate, user }) {
  const [activeTab, setActiveTab] = useState('transactions')
  const [currentMonth] = useState(getCurrentMonth())

  // Obtener gastos desde Firebase
  const { expenses, loading, deleteExpense } = useExpenses(user?.uid, currentMonth)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    onNavigate(tab)
  }

  const handleDelete = async (expenseId) => {
    if (confirm('¿Estás seguro de eliminar este gasto?')) {
      const result = await deleteExpense(expenseId)
      if (!result.success) {
        alert('Error al eliminar. Intenta de nuevo.')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <PageContainer hasBottomNav>
      <Header userName={user?.name || 'Usuario'} />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Transacciones
        </h1>
        <p className="text-text-secondary text-sm mb-6">
          {monthToReadable(currentMonth)} • {expenses.length} {expenses.length === 1 ? 'gasto' : 'gastos'}
        </p>

        {/* Si no hay gastos */}
        {expenses.length === 0 ? (
          <EmptyState
            icon="💰"
            title="No hay transacciones"
            description="Aún no tienes transacciones registradas este mes"
            action={
              <Button onClick={() => onNavigate('add-transaction')}>
                Agregar primera transacción
              </Button>
            }
          />
        ) : (
          /* Lista de transacciones */
          <div className="space-y-3">
            {expenses.map((expense) => (
              <Card key={expense.id} className="p-4">
                <div className="flex items-start justify-between">
                  {/* Info del gasto */}
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-3xl">{expense.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">
                        {expense.category}
                      </h3>
                      {expense.note && (
                        <p className="text-text-tertiary text-sm mb-2">
                          {expense.note}
                        </p>
                      )}
                      <p className="text-text-secondary text-xs">
                        {formatDate(expense.date, 'long')}
                      </p>
                    </div>
                  </div>

                  {/* Monto y acciones */}
                  <div className="text-right">
                    <p className="text-white font-semibold text-lg mb-2">
                      {formatCurrency(expense.amount)}
                    </p>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </PageContainer>
  )
}

export default Transactions