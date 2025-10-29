import { formatCurrency } from '../../utils/formatters.js'

function BalanceCard({ balance, income, expenses }) {
  return (
    <div className="px-4 py-4 bg-dark-card">
      <div className="mb-3">
        <p className="text-text-tertiary text-xs font-light mb-1">
          Balance Total
        </p>
        <h2 className="text-white text-3xl font-light tracking-tight">
          {formatCurrency(balance)}
        </h2>
      </div>

      <div className="h-px bg-dark-border mb-3"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div>
            <p className="text-text-tertiary text-xs">Ingresos</p>
            <p className="text-white text-sm font-medium">
              {formatCurrency(income)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="text-right">
            <p className="text-text-tertiary text-xs">Gastos</p>
            <p className="text-white text-sm font-medium">
              {formatCurrency(expenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard