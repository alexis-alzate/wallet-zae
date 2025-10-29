import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'

function ForgotPassword({ onNavigate, onResetPassword }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Por favor ingresa tu correo electrónico')
      return
    }

    if (!email.includes('@')) {
      setError('Correo electrónico inválido')
      return
    }

    setLoading(true)

    try {
      // Llamar a Firebase Auth
      const result = await onResetPassword(email)
      
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || 'Error al enviar el correo')
      }
    } catch (err) {
      setError('Error al enviar el correo. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Revisa tu correo
          </h2>
          <p className="text-text-secondary text-sm mb-8">
            Te hemos enviado un enlace para restablecer tu contraseña a{' '}
            <span className="text-white font-medium">{email}</span>
          </p>
          <Button
            fullWidth
            onClick={() => onNavigate('login')}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Header con botón volver */}
      <div className="px-6 pt-12 pb-6">
        <button
          onClick={() => onNavigate('login')}
          className="text-primary-yellow flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Volver</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12">
        <div className="max-w-sm mx-auto w-full">
          {/* Título */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-white mb-2">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-text-secondary text-sm">
              No te preocupes, te enviaremos instrucciones para restablecerla
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Correo electrónico"
              value={email}
              onChange={setEmail}
              placeholder="tu@email.com"
              icon="📧"
              required
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-xl p-3">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Enviar instrucciones'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword