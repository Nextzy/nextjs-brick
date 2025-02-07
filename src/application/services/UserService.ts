import { User } from '@domain/models/User'
import { UserRepository } from '@domain/repositories/UserRepository'

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async fetchUser(id: string): Promise<User> {
    return await this.userRepository.getUserById(id)
  }
}
