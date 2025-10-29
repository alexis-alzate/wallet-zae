import { useState, useEffect } from 'react'

/**
 * Hook para manejar autenticación biométrica
 * Por ahora simula el comportamiento, después se conectará con hardware real
 */
export function useBiometrics() {
  const [biometricsEnabled, setBiometricsEnabled] = useState(false)
  const [biometricsAvailable, setBiometricsAvailable] = useState(false)

  useEffect(() => {
    // Verificar si el navegador soporta Web Authentication API
    const checkBiometrics = () => {
      if (window.PublicKeyCredential) {
        setBiometricsAvailable(true)
      }
    }
    
    checkBiometrics()
    
    // Cargar preferencia guardada
    const saved = localStorage.getItem('biometricsEnabled')
    if (saved) {
      setBiometricsEnabled(JSON.parse(saved))
    }
  }, [])

  /**
   * Activar/desactivar biometría
   */
  const toggleBiometrics = async () => {
    try {
      if (!biometricsEnabled) {
        // Activar biometría
        // TODO: Cuando se compile a app nativa, usar Capacitor
        // import { BiometricAuth } from '@aparajita/capacitor-biometric-auth'
        
        // Por ahora, solo guardamos la preferencia
        setBiometricsEnabled(true)
        localStorage.setItem('biometricsEnabled', 'true')
        
        return { success: true, message: 'Biometría activada' }
      } else {
        // Desactivar biometría
        setBiometricsEnabled(false)
        localStorage.setItem('biometricsEnabled', 'false')
        
        return { success: true, message: 'Biometría desactivada' }
      }
    } catch (error) {
      return { success: false, error: 'Error al configurar biometría' }
    }
  }

  /**
   * Autenticar con biometría
   */
  const authenticateWithBiometrics = async () => {
    try {
      // TODO: Cuando se compile a app nativa:
      // const result = await BiometricAuth.authenticate({
      //   reason: 'Desbloquea Finanzas 360°',
      //   cancelTitle: 'Cancelar',
      //   allowDeviceCredential: true,
      //   iosFallbackTitle: 'Usar contraseña',
      //   androidTitle: 'Verificación biométrica',
      // })
      
      // Por ahora, simulamos éxito
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Autenticación fallida' }
    }
  }

  return {
    biometricsEnabled,
    biometricsAvailable,
    toggleBiometrics,
    authenticateWithBiometrics
  }
}