import { User } from '@domain/models/User'

export interface UserRepository {
  getUserById(id: string): Promise<User>
  login(email: string, password: string): Promise<{ token: string }>
}
