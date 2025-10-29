import { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth.js'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import AddTransaction from './pages/AddTransaction.jsx'
import AddAccount from './pages/AddAccount.jsx'
import Statistics from './pages/Statistics.jsx'
import Settings from './pages/Settings.jsx'
import Notifications from './pages/Notifications.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { user, loading, login, register, logout } = useAuth()

  const navigateTo = (page, params) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-yellow border-t-transparent"></div>
      </div>
    )
  }

  // No autenticado
  if (!user) {
    if (currentPage === 'register') {
      return <Register onNavigate={navigateTo} onRegister={register} />
    }
    return <Login onNavigate={navigateTo} onLogin={login} />
  }

  // Usuario autenticado
  switch (currentPage) {
    case 'transactions':
      return <Transactions onNavigate={navigateTo} user={user} />
    case 'add-transaction':
      return <AddTransaction onNavigate={navigateTo} user={user} />
    case 'add-account':
      return <AddAccount onNavigate={navigateTo} user={user} />
    case 'statistics':
      return <Statistics onNavigate={navigateTo} user={user} />
    case 'settings':
      return <Settings onNavigate={navigateTo} user={user} onLogout={logout} />
    case 'notifications':
      return <Notifications onNavigate={navigateTo} user={user} />
    default:
      return <Dashboard onNavigate={navigateTo} user={user} onLogout={logout} />
  }
}

export default App