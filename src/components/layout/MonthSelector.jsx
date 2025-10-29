import { getPreviousMonth, getNextMonth, monthToReadable, getCurrentMonth } from '../../utils/dateHelpers'

/**
 * Selector de mes con navegación
 * @param {string} currentMonth - Mes actual en formato YYYY-MM
 * @param {function} onMonthChange - Función al cambiar de mes
 */
function MonthSelector({ currentMonth, onMonthChange }) {
  const handlePrevious = () => {
    const prevMonth = getPreviousMonth(currentMonth)
    onMonthChange(prevMonth)
  }

  const handleNext = () => {
    const today = getCurrentMonth()
    // No permitir ir más allá del mes actual
    if (currentMonth < today) {
      const nextMonth = getNextMonth(currentMonth)
      onMonthChange(nextMonth)
    }
  }

  const isCurrentMonth = currentMonth === getCurrentMonth()

  return (
    <div className="px-5 py-4 bg-dark-card">
      <div className="flex items-center justify-between">
        {/* Botón anterior */}
        <button
          onClick={handlePrevious}
          className="p-2 text-primary-yellow hover:bg-dark-card-light rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Mes actual */}
        <div className="text-center">
          <h2 className="text-lg font-medium text-white">
            {monthToReadable(currentMonth)}
          </h2>
          {isCurrentMonth && (
            <span className="text-xs text-primary-yellow">Mes actual</span>
          )}
        </div>

        {/* Botón siguiente */}
        <button
          onClick={handleNext}
          disabled={isCurrentMonth}
          className={`
            p-2 rounded-lg transition-colors
            ${isCurrentMonth 
              ? 'text-text-tertiary cursor-not-allowed' 
              : 'text-primary-yellow hover:bg-dark-card-light'
            }
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MonthSelector