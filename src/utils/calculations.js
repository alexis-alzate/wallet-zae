/**
 * Calcula el total de gastos de un array
 * @param {Array} expenses - Array de gastos
 * @returns {number} - Total de gastos
 */
export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

/**
 * Calcula el disponible actual
 * @param {number} income - Ingresos del mes
 * @param {number} savings - Ahorros del mes
 * @param {number} expenses - Gastos del mes
 * @returns {number} - Disponible
 */
export const calculateAvailable = (income, savings, expenses) => {
  return income - savings - expenses
}

/**
 * Calcula el balance total (patrimonio)
 * @param {number} available - Disponible actual
 * @param {number} totalSavings - Ahorros acumulados
 * @returns {number} - Balance total
 */
export const calculateTotalBalance = (available, totalSavings) => {
  return available + totalSavings
}

/**
 * Agrupa gastos por categoría
 * @param {Array} expenses - Array de gastos
 * @returns {Object} - Objeto con gastos agrupados por categoría
 */
export const groupByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const category = expense.category
    if (!acc[category]) {
      acc[category] = {
        name: category,
        icon: expense.icon || '📦',
        total: 0,
        count: 0,
        expenses: []
      }
    }
    acc[category].total += expense.amount
    acc[category].count += 1
    acc[category].expenses.push(expense)
    return acc
  }, {})
}

/**
 * Calcula la comparación con el mes anterior
 * @param {number} currentMonth - Valor mes actual
 * @param {number} previousMonth - Valor mes anterior
 * @returns {Object} - { difference, percentage, trend }
 */
export const compareWithPreviousMonth = (currentMonth, previousMonth) => {
  if (previousMonth === 0) {
    return { difference: currentMonth, percentage: 100, trend: 'up' }
  }
  
  const difference = currentMonth - previousMonth
  const percentage = Math.round((difference / previousMonth) * 100)
  const trend = difference > 0 ? 'up' : difference < 0 ? 'down' : 'equal'
  
  return { difference, percentage, trend }
}