import { User } from '@domain/models/User'

export const localStorageService = {
  getToken: () => localStorage.getItem('auth_token'),
  setToken: (token: string) => localStorage.setItem('auth_token', token),
  removeToken: () => localStorage.removeItem('auth_token'),
  getUser: () => localStorage.getItem('user_details'),
  setUser: (userDetail: User) => localStorage.setItem('user_details', JSON.stringify(userDetail)),
  clearUser: () => localStorage.removeItem('user_details'),
}
