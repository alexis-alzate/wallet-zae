import { formatCurrency } from '../../utils/formatters.js'

function TrendChart({ currentAmount, previousAmount, label }) {
  const percentageChange = previousAmount > 0
    ? ((currentAmount - previousAmount) / previousAmount) * 100
    : 0

  const isIncrease = currentAmount > previousAmount
  const barHeight = Math.min((currentAmount / (previousAmount || 1)) * 100, 100)

  return (
    <div className="px-4 py-4 bg-dark-bg">
      <div className="bg-dark-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white text-sm font-medium">{label}</p>
          <div className="flex items-center gap-1">
            <span className={isIncrease ? 'text-red-500' : 'text-green-500'}>
              {isIncrease ? '↑' : '↓'}
            </span>
            <span className={`text-xs ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
              {Math.abs(percentageChange).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="h-2 bg-dark-bg rounded-full overflow-hidden mb-2">
          <div
            className={`h-full ${isIncrease ? 'bg-red-500' : 'bg-green-500'} transition-all`}
            style={{ width: `${barHeight}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-text-tertiary">Anterior</span>
          <span className="text-text-secondary">
            {formatCurrency(previousAmount)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TrendChart