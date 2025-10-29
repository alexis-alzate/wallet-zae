import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'

function Register({ onNavigate, onRegister }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      setError('Correo electrónico inválido')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    try {
      // Llamar a Firebase Auth (hook useAuth)
      const result = await onRegister(email, password, name)
      
      if (!result.success) {
        setError(result.error || 'Error al crear la cuenta')
      }
      // Si es exitoso, el hook useAuth actualiza el estado automáticamente
      
    } catch (err) {
      setError('Error al crear la cuenta. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
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

      {/* Container con scroll */}
      <div className="flex-1 overflow-y-auto px-6 pb-12">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Crear cuenta
          </h1>
          <p className="text-text-secondary text-sm">
            Comienza a controlar tus finanzas
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
          {/* Nombre */}
          <Input
            type="text"
            label="Nombre completo"
            value={name}
            onChange={setName}
            placeholder="Tu nombre"
            icon="👤"
            required
          />

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
            placeholder="Mínimo 6 caracteres"
            icon="🔒"
            required
          />

          {/* Confirm Password */}
          <Input
            type="password"
            label="Confirmar contraseña"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Repite tu contraseña"
            icon="🔒"
            required
          />

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-xl p-3">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Botón de registro */}
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
                'Crear Cuenta'
              )}
            </Button>
          </div>

          {/* Términos y condiciones */}
          <p className="text-text-tertiary text-xs text-center pt-2">
            Al registrarte, aceptas nuestros{' '}
            <button className="text-primary-yellow hover:underline">
              Términos y Condiciones
            </button>
            {' '}y{' '}
            <button className="text-primary-yellow hover:underline">
              Política de Privacidad
            </button>
          </p>
        </form>

        {/* Ya tienes cuenta */}
        <div className="text-center mt-8">
          <p className="text-text-secondary text-sm">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-primary-yellow font-medium hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register