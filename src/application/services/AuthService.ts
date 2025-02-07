import { User } from '@domain/models/User'
import { UserApi } from '@infrastructure/api/UserApi'
import { localStorageService } from '@infrastructure/storage/localStorage'

export class AuthService {
  private userApi: UserApi

  constructor() {
    this.userApi = new UserApi()
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    token: string
    data: User
  } | null> {
    try {
      const { token, data } = await this.userApi.login(email, password)
      localStorageService.setToken(token)
      localStorageService.setUser(data)
      document.cookie = `token=${token}; path=/;`
      return {
        token,
        data,
      }
    } catch (error) {
      return null
    }
  }

  logout(): void {
    localStorageService.removeToken()
    localStorageService.clearUser()
    document.cookie = `token=; path=/; Max-Age=0`
  }

  isAuthenticated(): boolean {
    return !!localStorageService.getToken()
  }
}
