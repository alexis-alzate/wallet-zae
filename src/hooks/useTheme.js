import { useState, useEffect } from 'react'

/**
 * Hook para manejar tema oscuro/claro
 */
export function useTheme() {
  const [theme, setTheme] = useState('dark') // 'dark' | 'light'

  useEffect(() => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      setTheme(systemTheme)
      applyTheme(systemTheme)
    }
  }, [])

  /**
   * Aplicar tema al documento
   */
  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * Cambiar tema
   */
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  /**
   * Establecer tema específico
   */
  const setSpecificTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setSpecificTheme
  }
}