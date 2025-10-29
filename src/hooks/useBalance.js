import { useMemo } from 'react'
import { calculateTotalExpenses, groupByCategory } from '../utils/calculations'

/**
 * Hook para calcular balance y estadísticas
 * @param {Array} expenses - Array de gastos
 * @param {number} monthlyIncome - Ingresos del mes
 * @param {number} monthlySavings - Ahorros del mes
 * @returns {Object} - Estadísticas calculadas
 */
export function useBalance(expenses, monthlyIncome = 0, monthlySavings = 0) {
  const stats = useMemo(() => {
    // Total de gastos
    const totalExpenses = calculateTotalExpenses(expenses)
    
    // Disponible
    const available = monthlyIncome - monthlySavings - totalExpenses
    
    // Balance total (patrimonio)
    const totalBalance = available + monthlySavings
    
    // Gastos por categoría
    const expensesByCategory = groupByCategory(expenses)
    
    // Categoría con más gastos
    const topCategory = Object.values(expensesByCategory)
      .sort((a, b) => b.total - a.total)[0]
    
    return {
      income: monthlyIncome,
      expenses: totalExpenses,
      savings: monthlySavings,
      available,
      totalBalance,
      expensesByCategory,
      topCategory
    }
  }, [expenses, monthlyIncome, monthlySavings])

  return stats
}