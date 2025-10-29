import { formatCurrency } from '../../utils/formatters.js'

function AccountsList({ accounts, onAddAccount }) {
  return (
    <div className="px-4 py-4 bg-dark-bg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-sm font-medium">Cuentas</h3>
        <button
          onClick={onAddAccount}
          className="text-primary-yellow text-xs hover:underline"
        >
          + Agregar
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex-shrink-0 w-32 bg-dark-card rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 ${account.color} rounded-lg flex items-center justify-center text-xl`}>
                {account.icon}
              </div>
            </div>
            <p className="text-white text-xs font-medium mb-1 truncate">
              {account.name}
            </p>
            <p className="text-text-secondary text-xs">
              {formatCurrency(account.balance)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountsList