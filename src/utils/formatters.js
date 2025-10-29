/**
 * Formatea un número como moneda colombiana
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Moneda formateada (ej: "$2.450.000")
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formatea un número como moneda abreviada
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Moneda abreviada (ej: "$2.4M")
 */
export const formatCurrencyShort = (amount) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}k`
  }
  return formatCurrency(amount)
}

/**
 * Formatea una fecha en español
 * @param {Date|string} date - Fecha a formatear
 * @param {string} format - Formato ('short' | 'long' | 'month')
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date)
  
  const formats = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    month: { month: 'long', year: 'numeric' }
  }
  
  return d.toLocaleDateString('es-CO', formats[format])
}

/**
 * Calcula el porcentaje de un valor respecto a un total
 * @param {number} value - Valor actual
 * @param {number} total - Total
 * @returns {number} - Porcentaje (0-100)
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}