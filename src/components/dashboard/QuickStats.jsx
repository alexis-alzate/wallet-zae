import { formatCurrency } from '../../utils/formatters.js'

function QuickStats({ stats }) {
  const cards = [
    {
      id: 'income',
      label: 'Ingresos',
      value: stats.income,
      icon: '💰',
      color: 'text-green-500'
    },
    {
      id: 'available',
      label: 'Disponible',
      value: stats.available,
      icon: '💵',
      color: 'text-blue-500'
    },
    {
      id: 'expenses',
      label: 'Gastos',
      value: stats.expenses,
      icon: '💸',
      color: 'text-red-500'
    },
    {
      id: 'savings',
      label: 'Ahorros',
      value: stats.savings,
      icon: '🏦',
      color: 'text-purple-500'
    }
  ]

  return (
    <div className="px-4 py-4 bg-dark-bg">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-dark-card rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{card.icon}</span>
              <p className="text-text-secondary text-xs">
                {card.label}
              </p>
            </div>
            <p className={`${card.color} text-base font-semibold`}>
              {formatCurrency(card.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickStats