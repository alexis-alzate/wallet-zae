/**
 * Categorías predefinidas de gastos
 */
export const EXPENSE_CATEGORIES = [
  { id: 'alimentacion', name: 'Alimentación', icon: '🍔', color: 'bg-orange-500' },
  { id: 'transporte', name: 'Transporte', icon: '🚌', color: 'bg-blue-500' },
  { id: 'vivienda', name: 'Vivienda', icon: '🏠', color: 'bg-green-500' },
  { id: 'servicios', name: 'Servicios', icon: '💡', color: 'bg-yellow-500' },
  { id: 'salud', name: 'Salud', icon: '⚕️', color: 'bg-red-500' },
  { id: 'educacion', name: 'Educación', icon: '📚', color: 'bg-purple-500' },
  { id: 'entretenimiento', name: 'Entretenimiento', icon: '🎮', color: 'bg-pink-500' },
  { id: 'ropa', name: 'Ropa', icon: '👕', color: 'bg-indigo-500' },
  { id: 'otros', name: 'Otros', icon: '📦', color: 'bg-gray-500' }
]

/**
 * Tipos de transacción
 */
export const TRANSACTION_TYPES = {
  EXPENSE: 'expense',
  INCOME: 'income',
  SAVINGS: 'savings'
}

/**
 * Límites y validaciones
 */
export const LIMITS = {
  MAX_AMOUNT: 999999999,
  MIN_AMOUNT: 1,
  MAX_NOTE_LENGTH: 200
}

/**
 * Mensajes de la aplicación
 */
export const MESSAGES = {
  SUCCESS: {
    EXPENSE_ADDED: 'Gasto registrado exitosamente',
    EXPENSE_DELETED: 'Gasto eliminado',
    EXPENSE_UPDATED: 'Gasto actualizado'
  },
  ERROR: {
    GENERIC: 'Ocurrió un error. Intenta de nuevo.',
    INVALID_AMOUNT: 'Monto inválido',
    REQUIRED_FIELDS: 'Completa todos los campos requeridos'
  }
}