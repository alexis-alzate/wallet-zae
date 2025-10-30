import { useState } from 'react'
import { useAccounts } from '../hooks/useAccounts.js'

const ACCOUNT_TYPES = [
  { value: 'general', label: 'General' },
  { value: 'banco', label: 'Banco' },
  { value: 'tarjeta', label: 'Tarjeta de Crédito' },
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'digital', label: 'Billetera Digital' }
]

const CURRENCIES = [
  { value: 'COP', label: 'COP' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' }
]

const COLORS = [
  '#20B2AA',
  '#3B82F6',
  '#10B981',
  '#A855F7',
  '#EF4444',
  '#F59E0B',
  '#EC4899',
  '#06B6D4'
]

function AddAccount({ onNavigate, user }) {
  const [name, setName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [type, setType] = useState('general')
  const [initialBalance, setInitialBalance] = useState('0')
  const [currency, setCurrency] = useState('COP')
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [showTypePicker, setShowTypePicker] = useState(false)
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [loading, setLoading] = useState(false)

  const { addAccount } = useAccounts(user?.uid)

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Por favor ingresa un nombre para la cuenta')
      return
    }

    setLoading(true)

    const accountData = {
      name: name.trim(),
      accountNumber: accountNumber.trim(),
      type,
      currency,
      initialBalance: parseFloat(initialBalance) || 0,
      color: selectedColor
    }

    const result = await addAccount(accountData)

    if (result.success) {
      onNavigate('dashboard')
    } else {
      alert('Error al crear la cuenta: ' + result.error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#1C1C1E]">
      <div className="bg-[#1C1C1E] px-4 pt-12 pb-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-12 h-12 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1 className="text-white text-xl font-semibold">Nueva cuenta</h1>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-12 h-12 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Nombre de la cuenta */}
        <div>
          <label className="text-gray-500 text-sm mb-2 block">
            Nombre de la cuenta
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            className="w-full bg-transparent border-b border-gray-700 text-white text-lg py-3 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        {/* Número de cuenta bancaria */}
        <div>
          <label className="text-gray-500 text-sm mb-2 block">
            Número de cuenta bancaria
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder=""
            className="w-full bg-transparent border-b border-gray-700 text-white text-lg py-3 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="text-gray-500 text-sm mb-2 block">
            Tipo
          </label>
          <button
            onClick={() => setShowTypePicker(true)}
            className="w-full text-left border-b border-gray-700 text-white text-lg py-3 flex items-center justify-between"
          >
            <span>{ACCOUNT_TYPES.find(t => t.value === type)?.label}</span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Valor inicial - INPUT DIRECTO ✅ */}
        <div>
          <label className="text-gray-500 text-sm mb-2 block">
            Valor inicial
          </label>
          <input
            type="number"
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent border-b border-gray-700 text-white text-lg py-3 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        {/* Moneda */}
        <div>
          <label className="text-gray-500 text-sm mb-2 block">
            Moneda
          </label>
          <button
            onClick={() => setShowCurrencyPicker(true)}
            className="w-full text-left border-b border-gray-700 text-white text-lg py-3 flex items-center justify-between"
          >
            <span>{currency}</span>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Color */}
        <div>
          <label className="text-gray-500 text-sm mb-2 block">
            Color
          </label>
          <button
            onClick={() => setShowColorPicker(true)}
            className="w-full rounded-2xl py-4 flex items-center justify-between px-4"
            style={{ backgroundColor: selectedColor }}
          >
            <span className="text-white font-medium">Color seleccionado</span>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal selector de tipo */}
      {showTypePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-[#2D2D2F] rounded-t-3xl w-full p-6 pb-safe">
            <h3 className="text-white text-xl font-bold mb-4">Selecciona un tipo</h3>
            <div className="space-y-2">
              {ACCOUNT_TYPES.map((accountType) => (
                <button
                  key={accountType.value}
                  onClick={() => {
                    setType(accountType.value)
                    setShowTypePicker(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl ${type === accountType.value ? 'bg-[#3B82F6] text-white' : 'bg-[#3A3A3C] text-white'
                    }`}
                >
                  {accountType.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTypePicker(false)}
              className="w-full bg-gray-700 text-white py-3 rounded-xl mt-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal selector de moneda */}
      {showCurrencyPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-[#2D2D2F] rounded-t-3xl w-full p-6 pb-safe">
            <h3 className="text-white text-xl font-bold mb-4">Selecciona una moneda</h3>
            <div className="space-y-2">
              {CURRENCIES.map((curr) => (
                <button
                  key={curr.value}
                  onClick={() => {
                    setCurrency(curr.value)
                    setShowCurrencyPicker(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl ${currency === curr.value ? 'bg-[#3B82F6] text-white' : 'bg-[#3A3A3C] text-white'
                    }`}
                >
                  {curr.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCurrencyPicker(false)}
              className="w-full bg-gray-700 text-white py-3 rounded-xl mt-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal selector de color */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-[#2D2D2F] rounded-t-3xl w-full p-6 pb-safe">
            <h3 className="text-white text-xl font-bold mb-4">Selecciona un color</h3>
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setShowColorPicker(false)
                  }}
                  className="w-full aspect-square rounded-2xl active:scale-95 transition-transform"
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowColorPicker(false)}
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

export default AddAccount
