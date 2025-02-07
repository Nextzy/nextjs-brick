import { useAuthStore } from '@application/state/AuthStore'
import { AuthService } from '@application/services/AuthService'
import { useEffect, useState } from 'react'
import { localStorageService } from '@infrastructure/storage/localStorage'
import { useUserStore } from '@application/state/UserStore'

export const useAuth = () => {
  const { token, setToken } = useAuthStore()
  const { clearUser, setUser } = useUserStore()
  const [error, setError] = useState<string | null>(null)
  const authService = new AuthService()
  const useLocalStorage = typeof window !== 'undefined' ? localStorageService : null
  const getToken = useLocalStorage?.getToken()
  const userDetails = useLocalStorage?.getUser()

  useEffect(() => {
    if (getToken) {
      setToken(getToken)
    }
  }, [getToken])

  useEffect(() => {
    if (userDetails) {
      setUser(JSON.parse(userDetails))
    }
  }, [userDetails])

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password)
      if (response?.token) {
        setToken(token)
        setError(null)
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed')
    }
  }

  const logout = () => {
    authService.logout()
    setToken(null)
    clearUser()
  }

  return { token, login, logout, error }
}
