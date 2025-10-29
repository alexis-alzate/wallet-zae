import { formatCurrency } from '../../utils/formatters.js'

function ExpenseList({ expenses, totalBudget, onViewMore }) {
  const sortedExpenses = [...expenses].sort((a, b) => b.total - a.total)
  const topExpenses = sortedExpenses.slice(0, 5)

  return (
    <div className="px-4 py-4 bg-dark-bg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-sm font-medium">
          Gastos por categoría
        </h3>
        {expenses.length > 5 && (
          <button
            onClick={onViewMore}
            className="text-primary-yellow text-xs hover:underline"
          >
            Ver todo
          </button>
        )}
      </div>

      <div className="space-y-3">
        {topExpenses.map((expense) => {
          const percentage = totalBudget > 0
            ? (expense.total / totalBudget) * 100
            : 0

          return (
            <div
              key={expense.id || expense.name}
              className="bg-dark-card rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{expense.icon}</span>
                  <p className="text-white text-sm font-medium">
                    {expense.name}
                  </p>
                </div>
                <p className="text-white text-sm font-semibold">
                  {formatCurrency(expense.total)}
                </p>
              </div>

              <div className="h-1.5 bg-dark-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-yellow transition-all"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-1">
                <p className="text-text-tertiary text-xs">
                  {expense.count || 0} {expense.count === 1 ? 'gasto' : 'gastos'}
                </p>
                <p className="text-text-secondary text-xs">
                  {percentage.toFixed(0)}%
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {topExpenses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-text-tertiary text-sm">
            No hay gastos por categoría
          </p>
        </div>
      )}
    </div>
  )
}

export default ExpenseList