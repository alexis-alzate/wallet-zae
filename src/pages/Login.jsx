import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'

function Login({ onNavigate, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      setError('Correo electrónico inválido')
      return
    }

    setLoading(true)

    try {
      // Llamar a Firebase Auth (hook useAuth)
      const result = await onLogin(email, password)
      
      if (!result.success) {
        setError(result.error || 'Error al iniciar sesión')
      }
      // Si es exitoso, el hook useAuth actualiza el estado automáticamente
      
    } catch (err) {
      setError('Error al iniciar sesión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Container con scroll */}
      <div className="flex-1 overflow-y-auto px-6 py-12">
        {/* Logo y título */}
        <div className="text-center mb-12 mt-8">
          <div className="text-6xl mb-4 animate-fade-in">💰</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            FINANZAS 360°
          </h1>
          <p className="text-text-secondary text-sm">
            Tu dinero, bajo control
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
          {/* Email */}
          <Input
            type="email"
            label="Correo electrónico"
            value={email}
            onChange={setEmail}
            placeholder="tu@email.com"
            icon="📧"
            required
          />

          {/* Password */}
          <Input
            type="password"
            label="Contraseña"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            icon="🔒"
            required
          />

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-xl p-3">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Botón de login */}
          <div className="pt-4">
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </div>

          {/* Olvidaste contraseña */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-primary-yellow text-sm hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8 max-w-sm mx-auto">
          <div className="flex-1 h-px bg-dark-border"></div>
          <span className="text-text-tertiary text-sm">o</span>
          <div className="flex-1 h-px bg-dark-border"></div>
        </div>

        {/* Social login (placeholder) */}
        <div className="space-y-3 max-w-sm mx-auto">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => alert('Apple Sign In - Próximamente')}
          >
            <span className="flex items-center justify-center gap-2">
              <span>🍎</span>
              <span>Continuar con Apple</span>
            </span>
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => alert('Google Sign In - Próximamente')}
          >
            <span className="flex items-center justify-center gap-2">
              <span>🔵</span>
              <span>Continuar con Google</span>
            </span>
          </Button>
        </div>

        {/* Registro */}
        <div className="text-center mt-8 mb-4">
          <p className="text-text-secondary text-sm">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-primary-yellow font-medium hover:underline"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login