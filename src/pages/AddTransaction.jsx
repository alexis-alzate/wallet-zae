import { useState, useEffect } from 'react'
import { useAccounts } from '../hooks/useAccounts.js'

const CATEGORIES = [
  { id: 'alimentacion', name: 'Alimentación', icon: '🍔', color: '#10B981' },
  { id: 'transporte', name: 'Transporte', icon: '🚗', color: '#3B82F6' },
  { id: 'entretenimiento', name: 'Entretenimiento', icon: '🎮', color: '#8B5CF6' },
  { id: 'salud', name: 'Salud', icon: '⚕️', color: '#EF4444' },
  { id: 'educacion', name: 'Educación', icon: '📚', color: '#F59E0B' },
  { id: 'servicios', name: 'Servicios', icon: '💡', color: '#06B6D4' },
  { id: 'otros', name: 'Otros', icon: '📦', color: '#6B7280' }
]

/**
 * Pantalla para agregar transacción - Estilo Wallet
 */
function AddTransaction({ onNavigate, user }) {
  const [transactionType, setTransactionType] = useState('expense') // 'income', 'expense', 'transfer'
  const [amount, setAmount] = useState('0')
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('otros')
  const [showAccountSelector, setShowAccountSelector] = useState(false)
  const [showCategorySelector, setShowCategorySelector] = useState(false)

  const { accounts } = useAccounts(user?.uid)

  // Seleccionar primera cuenta por defecto
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0])
    }
  }, [accounts, selectedAccount])

  const handleNumberClick = (num) => {
    if (amount === '0') {
      setAmount(num)
    } else {
      setAmount(amount + num)
    }
  }

  const handleBackspace = () => {
    if (amount.length === 1) {
      setAmount('0')
    } else {
      setAmount(amount.slice(0, -1))
    }
  }

  const handleDecimal = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.')
    }
  }

  const handleSave = () => {
    // TODO: Guardar transacción
    console.log({
      type: transactionType,
      amount: parseFloat(amount),
      account: selectedAccount,
      category: selectedCategory
    })
    onNavigate('dashboard')
  }

  return (
    <div className="min-h-screen bg-[#4A9B9B] relative">
      {/* Header */}
      <div className="bg-[#4A9B9B] px-4 pt-12 pb-4 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="w-12 h-12 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button 
          onClick={handleSave}
          className="w-12 h-12 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[#4A9B9B] px-4">
        <div className="grid grid-cols-3 gap-0">
          <button
            onClick={() => setTransactionType('income')}
            className={`py-4 text-xs font-bold transition-colors border-b-2 ${
              transactionType === 'income'
                ? 'text-white border-white'
                : 'text-white/60 border-transparent'
            }`}
          >
            INGRESOS
          </button>
          <button
            onClick={() => setTransactionType('expense')}
            className={`py-4 text-xs font-bold transition-colors border-b-2 ${
              transactionType === 'expense'
                ? 'text-white border-white'
                : 'text-white/60 border-transparent'
            }`}
          >
            GASTO
          </button>
          <button
            onClick={() => setTransactionType('transfer')}
            className={`py-4 text-xs font-bold transition-colors border-b-2 ${
              transactionType === 'transfer'
                ? 'text-white border-white'
                : 'text-white/60 border-transparent'
            }`}
          >
            TRANSFERENCIA
          </button>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex flex-col items-center justify-center py-12 px-4">
        {/* Botón +/- según tipo de transacción */}
        <div className="text-white mb-8">
          {transactionType === 'income' ? (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          ) : transactionType === 'expense' ? (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
            </svg>
          ) : (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          )}
        </div>

        {/* Display de monto */}
        <div className="flex items-center gap-4 mb-12">
          <p className="text-white text-7xl font-light">
            {amount}
          </p>
          <p className="text-white text-3xl font-light">
            COP
          </p>
          <button className="text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Selectores */}
        <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-6">
          {/* Selector de Cuenta */}
          <button
            onClick={() => setShowAccountSelector(true)}
            className="bg-[#5AADAD] rounded-xl p-4 text-center"
          >
            <p className="text-white/70 text-xs mb-1">Cuenta</p>
            <p className="text-white text-sm font-bold uppercase">
              {selectedAccount?.name || 'BANCOLOMBIA'}
            </p>
          </button>

          {/* Selector de Categoría */}
          <button
            onClick={() => setShowCategorySelector(true)}
            className="bg-[#5AADAD] rounded-xl p-4 text-center"
          >
            <p className="text-white/70 text-xs mb-1">Categoría</p>
            <p className="text-white text-sm font-bold uppercase">
              {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'OTROS'}
            </p>
          </button>
        </div>

        {/* Botón Plantillas */}
        <button className="w-full max-w-md bg-[#5AADAD] rounded-xl py-4 mb-8">
          <p className="text-white text-sm font-bold">PLANTILLAS</p>
        </button>
      </div>

      {/* Teclado numérico */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#2D2D2D] pb-safe">
        <div className="grid grid-cols-4 gap-0">
          {/* Fila 1: 7 8 9 ÷ */}
          <button onClick={() => handleNumberClick('7')} className="py-6 text-white text-3xl font-light active:bg-gray-700">7</button>
          <button onClick={() => handleNumberClick('8')} className="py-6 text-white text-3xl font-light active:bg-gray-700">8</button>
          <button onClick={() => handleNumberClick('9')} className="py-6 text-white text-3xl font-light active:bg-gray-700">9</button>
          <button className="py-6 text-white text-3xl font-light active:bg-gray-700">÷</button>

          {/* Fila 2: 4 5 6 × */}
          <button onClick={() => handleNumberClick('4')} className="py-6 text-white text-3xl font-light active:bg-gray-700">4</button>
          <button onClick={() => handleNumberClick('5')} className="py-6 text-white text-3xl font-light active:bg-gray-700">5</button>
          <button onClick={() => handleNumberClick('6')} className="py-6 text-white text-3xl font-light active:bg-gray-700">6</button>
          <button className="py-6 text-white text-3xl font-light active:bg-gray-700">×</button>

          {/* Fila 3: 1 2 3 + */}
          <button onClick={() => handleNumberClick('1')} className="py-6 text-white text-3xl font-light active:bg-gray-700">1</button>
          <button onClick={() => handleNumberClick('2')} className="py-6 text-white text-3xl font-light active:bg-gray-700">2</button>
          <button onClick={() => handleNumberClick('3')} className="py-6 text-white text-3xl font-light active:bg-gray-700">3</button>
          <button className="py-6 text-white text-3xl font-light active:bg-gray-700">+</button>

          {/* Fila 4: . 0 < = */}
          <button onClick={handleDecimal} className="py-6 text-white text-3xl font-light active:bg-gray-700">.</button>
          <button onClick={() => handleNumberClick('0')} className="py-6 text-white text-3xl font-light active:bg-gray-700">0</button>
          <button onClick={handleBackspace} className="py-6 text-white active:bg-gray-700 flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button className="py-6 text-white text-3xl font-light active:bg-gray-700">=</button>
        </div>
      </div>

      {/* Modal selector de cuenta */}
      {showAccountSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-[#2D2D2F] rounded-t-3xl w-full p-6 pb-safe">
            <h3 className="text-white text-xl font-bold mb-4">Selecciona una cuenta</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => {
                    setSelectedAccount(account)
                    setShowAccountSelector(false)
                  }}
                  className="w-full bg-[#3A3A3C] rounded-xl p-4 text-left active:scale-95 transition-transform"
                >
                  <p className="text-white font-semibold">{account.name}</p>
                  <p className="text-gray-400 text-sm">
                    {account.currency} {(account.balance / 1000).toFixed(3)}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAccountSelector(false)}
              className="w-full bg-gray-700 text-white py-3 rounded-xl mt-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal selector de categoría */}
      {showCategorySelector && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-[#2D2D2F] rounded-t-3xl w-full p-6 pb-safe">
            <h3 className="text-white text-xl font-bold mb-4">Selecciona una categoría</h3>
            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setShowCategorySelector(false)
                  }}
                  className="bg-[#3A3A3C] rounded-xl p-4 text-center active:scale-95 transition-transform"
                  style={{ borderLeft: `4px solid ${category.color}` }}
                >
                  <span className="text-3xl mb-2 block">{category.icon}</span>
                  <p className="text-white text-sm font-semibold">{category.name}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCategorySelector(false)}
              className="w-full bg-gray-700 text-white py-3 rounded-xl mt-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTransaction
