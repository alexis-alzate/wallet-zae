/**
 * Obtiene el mes actual en formato YYYY-MM
 * @returns {string} - Mes actual (ej: "2025-10")
 */
export const getCurrentMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

/**
 * Obtiene el mes anterior en formato YYYY-MM
 * @param {string} month - Mes en formato YYYY-MM
 * @returns {string} - Mes anterior
 */
export const getPreviousMonth = (month) => {
  const [year, monthNum] = month.split('-').map(Number)
  const date = new Date(year, monthNum - 1, 1)
  date.setMonth(date.getMonth() - 1)
  
  const newYear = date.getFullYear()
  const newMonth = String(date.getMonth() + 1).padStart(2, '0')
  return `${newYear}-${newMonth}`
}

/**
 * Obtiene el mes siguiente en formato YYYY-MM
 * @param {string} month - Mes en formato YYYY-MM
 * @returns {string} - Mes siguiente
 */
export const getNextMonth = (month) => {
  const [year, monthNum] = month.split('-').map(Number)
  const date = new Date(year, monthNum - 1, 1)
  date.setMonth(date.getMonth() + 1)
  
  const newYear = date.getFullYear()
  const newMonth = String(date.getMonth() + 1).padStart(2, '0')
  return `${newYear}-${newMonth}`
}

/**
 * Convierte un mes YYYY-MM a formato legible
 * @param {string} month - Mes en formato YYYY-MM
 * @returns {string} - Mes legible (ej: "Octubre 2025")
 */
export const monthToReadable = (month) => {
  const [year, monthNum] = month.split('-')
  const date = new Date(year, monthNum - 1, 1)
  return date.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
}

/**
 * Verifica si un mes es el mes actual
 * @param {string} month - Mes en formato YYYY-MM
 * @returns {boolean} - true si es el mes actual
 */
export const isCurrentMonth = (month) => {
  return month === getCurrentMonth()
}

/**
 * Obtiene los últimos N meses
 * @param {number} count - Cantidad de meses
 * @returns {Array} - Array de meses en formato YYYY-MM
 */
export const getLastMonths = (count) => {
  const months = []
  let current = getCurrentMonth()
  
  for (let i = 0; i < count; i++) {
    months.push(current)
    current = getPreviousMonth(current)
  }
  
  return months
}