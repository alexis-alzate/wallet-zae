import { useState } from 'react'
import { useAccounts } from '../hooks/useAccounts.js'
import { getCurrentMonth } from '../utils/dateHelpers.js'
import { formatCurrency } from '../utils/formatters.js'

/**
 * Dashboard - Tarjetas delgadas y largas como Wallet
 */
function Dashboard({ onNavigate, user }) {
  const [activeTab, setActiveTab] = useState('accounts')
  const [activeBottomTab, setActiveBottomTab] = useState('dashboard')
  const [currentMonth] = useState(getCurrentMonth())
  
  const { accounts, totalBalance, loading } = useAccounts(user?.uid)

  // Mock data para comparación
  const previousBalance = 360000
  const percentageChange = totalBalance > 0 
    ? ((totalBalance - previousBalance) / previousBalance) * 100 
    : -23

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1C1C1E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFD700] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1C1C1E] pb-20">
      {/* Header */}
      <div className="bg-[#1C1C1E] px-4 pt-12 pb-4 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('settings')}
          className="w-10 h-10 flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-white text-xl font-semibold">Inicio</h1>

        <button 
          onClick={() => onNavigate('notifications')}
          className="w-10 h-10 flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[#1C1C1E] px-4">
        <div className="flex gap-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`pb-3 text-sm font-medium relative ${
              activeTab === 'accounts' ? 'text-white' : 'text-gray-500'
            }`}
          >
            CUENTAS
            {activeTab === 'accounts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('budgets')}
            className={`pb-3 text-sm font-medium relative ${
              activeTab === 'budgets' ? 'text-white' : 'text-gray-500'
            }`}
          >
            PRESUPUESTOS Y METAS
            {activeTab === 'budgets' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="px-4 pt-6">
        {/* Lista de cuentas header con botón de configuración */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-base font-medium">Lista de cuentas</h2>
          <button className="text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Grid de cuentas 2x2 - DELGADAS Y LARGAS */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => console.log('Ver cuenta:', account.id)}
                className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
                style={{
                  backgroundColor: 
                    account.color === 'bg-blue-500' ? '#3B82F6' :
                    account.color === 'bg-green-500' ? '#10B981' :
                    account.color === 'bg-purple-500' ? '#8B5CF6' :
                    account.color === 'bg-red-500' ? '#EF4444' : '#3B82F6'
                }}
              >
                <p className="text-white text-sm font-medium mb-1 opacity-90">
                  {account.name}
                </p>
               <p className="text-white text-lg font-bold">
  {account.currency} {account.balance.toLocaleString('es-CO')}
</p>
              </button>
            ))
          ) : (
            <>
              <div className="rounded-2xl p-4 bg-[#20B2AA]">
                <p className="text-white text-sm font-medium mb-1 opacity-90">Bancolombia</p>
                <p className="text-white text-lg font-bold">COP 259,000....</p>
              </div>
              <div className="rounded-2xl p-4 bg-[#3B82F6]">
                <p className="text-white text-sm font-medium mb-1 opacity-90">Efectivo</p>
                <p className="text-white text-lg font-bold">COP 3,200.00</p>
              </div>
              <div className="rounded-2xl p-4 bg-[#10B981]">
                <p className="text-white text-sm font-medium mb-1 opacity-90">Nequi</p>
                <p className="text-white text-lg font-bold">COP 14,000.00</p>
              </div>
              <div className="rounded-2xl p-4 bg-[#A855F7]">
                <p className="text-white text-sm font-medium mb-1 opacity-90">Dollar App</p>
                <p className="text-white text-lg font-bold">$0.43</p>
              </div>
            </>
          )}
        </div>

        {/* Botón Añadir Cuenta - COMPACTO */}
        <button
          onClick={() => onNavigate('add-account')}
          className="w-full rounded-2xl border-2 border-dashed border-[#3B82F6] py-3 flex items-center justify-center gap-3 mb-4 active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-[#3B82F6] text-sm font-semibold">AÑADIR CUENTA</span>
        </button>

        {/* Sección REGISTROS */}
        <div className="mb-4">
          <button
            onClick={() => onNavigate('transactions')}
            className="w-full bg-[#2D2D2F] rounded-2xl px-4 py-3 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-white text-sm font-semibold">REGISTROS</span>
          </button>
        </div>

        {/* Pills horizontales: Deudas, Saldo, Informes */}
        <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => console.log('Deudas')}
            className="flex items-center gap-2 bg-[#2D2D2F] rounded-full px-5 py-2.5 whitespace-nowrap"
          >
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-sm font-medium">Deudas</span>
          </button>

          <button
            onClick={() => console.log('Saldo')}
            className="flex items-center gap-2 bg-[#2D2D2F] rounded-full px-5 py-2.5 whitespace-nowrap"
          >
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-sm font-medium">Saldo</span>
          </button>

          <button
            onClick={() => console.log('Informes')}
            className="flex items-center gap-2 bg-[#2D2D2F] rounded-full px-5 py-2.5 whitespace-nowrap"
          >
            <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-sm font-medium">Informes</span>
          </button>
        </div>

        {/* Tendencia del saldo */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-lg font-medium">Tendencia del saldo</h3>
            <button className="text-gray-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>

          <div className="bg-[#2D2D2F] rounded-2xl p-4">
            {/* Balance HOY */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-1">
                <p className="text-gray-400 text-xs">HOY</p>
                <p className="text-xs text-gray-400">frente al período anterior</p>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-white text-3xl font-bold">
                  COP 277,853.07
                </p>
                <p className="text-red-500 text-xl font-bold">
                  -23%
                </p>
              </div>
            </div>

            {/* Gráfica */}
            <div className="h-40 relative mb-3">
              <svg className="w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="28" x2="400" y2="28" stroke="#3A3A3C" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="56" x2="400" y2="56" stroke="#3A3A3C" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="84" x2="400" y2="84" stroke="#3A3A3C" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="112" x2="400" y2="112" stroke="#3A3A3C" strokeWidth="0.5" strokeDasharray="4 4" />
                
                {/* Área bajo la curva */}
                <path
                  d="M0,40 L50,38 L100,36 L150,35 L200,34 L250,32 L300,28 L350,120 L400,135 L400,140 L0,140 Z"
                  fill="url(#gradient)"
                />
                
                {/* Línea de tendencia */}
                <polyline
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,40 50,38 100,36 150,35 200,34 250,32 300,28 350,120 400,135"
                />

                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Labels Y */}
              <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none">
                <span className="text-gray-600 text-xs">360k</span>
                <span className="text-gray-600 text-xs">340k</span>
                <span className="text-gray-600 text-xs">320k</span>
                <span className="text-gray-600 text-xs">300k</span>
                <span className="text-gray-600 text-xs">280k</span>
              </div>

              {/* Labels X */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-gray-600 text-xs px-2">
                <span>29 sept</span>
                <span>9 oct</span>
                <span>19 oct</span>
                <span>Hoy</span>
              </div>
            </div>

            <button className="text-[#3B82F6] text-sm font-semibold">
              MOSTRAR MÁS
            </button>
          </div>
        </div>
      </div>

      {/* Botón flotante + AZUL */}
      <button
        onClick={() => onNavigate('add-transaction')}
        className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-[#3B82F6] shadow-lg flex items-center justify-center active:scale-90 transition-transform z-50"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-gray-800 px-6 py-3">
        <div className="flex items-center justify-around">
          <button
            onClick={() => {
              setActiveBottomTab('dashboard')
              onNavigate('dashboard')
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeBottomTab === 'dashboard' ? 'bg-gray-800' : ''}`}>
              <svg className={`w-6 h-6 ${activeBottomTab === 'dashboard' ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('stats')
              onNavigate('statistics')
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeBottomTab === 'stats' ? 'bg-gray-800' : ''}`}>
              <svg className={`w-6 h-6 ${activeBottomTab === 'stats' ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('transactions')
              onNavigate('transactions')
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeBottomTab === 'transactions' ? 'bg-gray-800' : ''}`}>
              <svg className={`w-6 h-6 ${activeBottomTab === 'transactions' ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('notifications')
              onNavigate('notifications')
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeBottomTab === 'notifications' ? 'bg-gray-800' : ''}`}>
              <svg className={`w-6 h-6 ${activeBottomTab === 'notifications' ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
