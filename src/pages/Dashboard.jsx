import { useState } from 'react'
import { useAccounts } from '../hooks/useAccounts.js'

function Dashboard({ onNavigate, user }) {
  const [activeTab, setActiveTab] = useState('accounts')
  const [activeBottomTab, setActiveBottomTab] = useState('dashboard')

  const { accounts, totalBalance, loading } = useAccounts(user?.uid)

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
      {/* Header - SIN PADDING LATERAL */}
      <div className="bg-[#1C1C1E] px-3 pt-14 pb-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('settings')}
          className="w-10 h-10 flex items-center justify-center -ml-1"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-white text-xl font-semibold">Inicio</h1>

        <button
          onClick={() => onNavigate('notifications')}
          className="w-10 h-10 flex items-center justify-center -mr-1"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[#1C1C1E] px-3">
        <div className="flex gap-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`pb-3 text-xs font-bold relative whitespace-nowrap ${activeTab === 'accounts' ? 'text-white' : 'text-gray-500'
              }`}
          >
            CUENTAS
            {activeTab === 'accounts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('budgets')}
            className={`pb-3 text-xs font-bold relative whitespace-nowrap ${activeTab === 'budgets' ? 'text-white' : 'text-gray-500'
              }`}
          >
            PRESUPUESTOS Y METAS
            {activeTab === 'budgets' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Contenido - SIN PADDING LATERAL EXCESIVO */}
      <div className="px-3 pt-5">
        {/* Lista de cuentas header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-base font-semibold">Lista de cuentas</h2>
          <button className="text-white p-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Grid de cuentas - 3 COLUMNAS */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {accounts.length > 0 ? (
            <>
              {accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => console.log('Ver cuenta:', account.id)}
                  className="rounded-lg p-2.5 text-left active:scale-95 transition-all"
                  style={{
                    backgroundColor: account.color,
                    minHeight: '65px'
                  }}
                >
                  <p className="text-white text-[10px] font-medium mb-1 opacity-90 truncate leading-tight">
                    {account.name}
                  </p>
                  <p className="text-white text-xs font-bold leading-tight">
                    {account.currency} {account.balance.toLocaleString('es-CO')}
                  </p>
                </button>
              ))}

              {/* Botón Añadir Cuenta - EN LA ÚLTIMA POSICIÓN */}
              <button
                onClick={() => onNavigate('add-account')}
                className="rounded-lg border-2 border-dashed border-[#3B82F6] bg-transparent flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform"
                style={{ minHeight: '65px' }}
              >
                <div className="w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[#3B82F6] text-[9px] font-bold leading-tight">AÑADIR</span>
                <span className="text-[#3B82F6] text-[9px] font-bold leading-tight">CUENTA</span>
              </button>
            </>
          ) : (
            <>
              <div className="rounded-lg p-2.5 bg-[#20B2AA]" style={{ minHeight: '65px' }}>
                <p className="text-white text-[10px] font-medium mb-1 opacity-90 leading-tight">Bancolombia</p>
                <p className="text-white text-xs font-bold leading-tight">COP 259.000</p>
              </div>
              <div className="rounded-lg p-2.5 bg-[#3B82F6]" style={{ minHeight: '65px' }}>
                <p className="text-white text-[10px] font-medium mb-1 opacity-90 leading-tight">Efectivo</p>
                <p className="text-white text-xs font-bold leading-tight">COP 3.200</p>
              </div>
              <div className="rounded-lg p-2.5 bg-[#10B981]" style={{ minHeight: '65px' }}>
                <p className="text-white text-[10px] font-medium mb-1 opacity-90 leading-tight">Nequi</p>
                <p className="text-white text-xs font-bold leading-tight">COP 14.000</p>
              </div>
              <div className="rounded-lg p-2.5 bg-[#A855F7]" style={{ minHeight: '65px' }}>
                <p className="text-white text-[10px] font-medium mb-1 opacity-90 leading-tight">Dollar App</p>
                <p className="text-white text-xs font-bold leading-tight">$0.43</p>
              </div>
              <div className="rounded-lg p-2.5 bg-[#EC4899]" style={{ minHeight: '65px' }}>
                <p className="text-white text-[10px] font-medium mb-1 opacity-90 leading-tight">People</p>
                <p className="text-white text-xs font-bold leading-tight">COP 0</p>
              </div>

              {/* Botón Añadir Cuenta */}
              <button
                onClick={() => onNavigate('add-account')}
                className="rounded-lg border-2 border-dashed border-[#3B82F6] bg-transparent flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform"
                style={{ minHeight: '65px' }}
              >
                <div className="w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[#3B82F6] text-[9px] font-bold leading-tight">AÑADIR</span>
                <span className="text-[#3B82F6] text-[9px] font-bold leading-tight">CUENTA</span>
              </button>
            </>
          )}
        </div>

        {/* Sección REGISTROS */}
        <div className="mb-3">
          <button
            onClick={() => onNavigate('transactions')}
            className="w-full bg-[#2D2D2F] rounded-lg px-3 py-2.5 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-white text-xs font-bold">REGISTROS</span>
          </button>
        </div>

        {/* Pills horizontales */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          <button className="flex items-center gap-1.5 bg-[#2D2D2F] rounded-full px-3 py-1.5 whitespace-nowrap">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-xs font-medium">Deudas</span>
          </button>

          <button className="flex items-center gap-1.5 bg-[#2D2D2F] rounded-full px-3 py-1.5 whitespace-nowrap">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-xs font-medium">Saldo</span>
          </button>

          <button className="flex items-center gap-1.5 bg-[#2D2D2F] rounded-full px-3 py-1.5 whitespace-nowrap">
            <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-xs font-medium">Informes</span>
          </button>
        </div>

        {/* Tendencia del saldo */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white text-base font-semibold">Tendencia del saldo</h3>
            <button className="text-gray-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>

          <div className="bg-[#2D2D2F] rounded-lg p-3">
            <div className="mb-3">
              <div className="flex items-start justify-between mb-0.5">
                <p className="text-gray-400 text-[10px]">HOY</p>
                <p className="text-[10px] text-gray-400">frente al período anterior</p>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-white text-xl font-bold">
                  COP {totalBalance.toLocaleString('es-CO')}
                </p>
                <p className="text-red-500 text-base font-bold">
                  {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(0)}%
                </p>
              </div>
            </div>

            <div className="h-28 relative mb-2">
              <svg className="w-full h-full" viewBox="0 0 400 110" preserveAspectRatio="none">
                <line x1="0" y1="22" x2="400" y2="22" stroke="#3A3A3C" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="44" x2="400" y2="44" stroke="#3A3A3C" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="66" x2="400" y2="66" stroke="#3A3A3C" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="0" y1="88" x2="400" y2="88" stroke="#3A3A3C" strokeWidth="0.5" strokeDasharray="4 4" />

                <path
                  d="M0,30 L50,28 L100,27 L150,26 L200,25 L250,23 L300,20 L350,95 L400,108 L400,110 L0,110 Z"
                  fill="url(#gradient)"
                />

                <polyline
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="0,30 50,28 100,27 150,26 200,25 250,23 300,20 350,95 400,108"
                />

                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col justify-between py-0.5 pointer-events-none">
                <span className="text-gray-600 text-[10px]">360k</span>
                <span className="text-gray-600 text-[10px]">340k</span>
                <span className="text-gray-600 text-[10px]">320k</span>
                <span className="text-gray-600 text-[10px]">300k</span>
                <span className="text-gray-600 text-[10px]">280k</span>
              </div>

              <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-gray-600 text-[10px] px-1">
                <span>29 sept</span>
                <span>9 oct</span>
                <span>19 oct</span>
                <span>Hoy</span>
              </div>
            </div>

            <button className="text-[#3B82F6] text-xs font-bold mt-3">
              MOSTRAR MÁS
            </button>
          </div>
        </div>
      </div>

      {/* Botón flotante */}
      <button
        onClick={() => onNavigate('add-transaction')}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-[#3B82F6] shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-50"
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-gray-800 px-4 py-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => {
              setActiveBottomTab('dashboard')
              onNavigate('dashboard')
            }}
            className="flex flex-col items-center"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeBottomTab === 'dashboard' ? 'bg-gray-800' : ''}`}>
              <svg className={`w-5 h-5 ${activeBottomTab === 'dashboard' ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('stats')
              onNavigate('statistics')
            }}
            className="flex flex-col items-center"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeBottomTab === 'stats' ? 'bg-gray-800' : ''}`}>
              <svg className={`w-5 h-5 ${activeBottomTab === 'stats' ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('transactions')
              onNavigate('transactions')
            }}
            className="flex flex-col items-center"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeBottomTab === 'transactions' ? 'bg-gray-800' : ''}`}>
              <svg className={`w-5 h-5 ${activeBottomTab === 'transactions' ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
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
            className="flex flex-col items-center"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeBottomTab === 'notifications' ? 'bg-gray-800' : ''}`}>
              <svg className={`w-5 h-5 ${activeBottomTab === 'notifications' ? 'text-white' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
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
 
