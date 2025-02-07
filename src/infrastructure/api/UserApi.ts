import { httpClient } from './HttpClient'
import { User } from '@domain/models/User'
import { UserRepository } from '@domain/repositories/UserRepository'

export class UserApi implements UserRepository {
  async getUserById(id: string): Promise<User> {
    // For mock Login
    return {
      id: '1',
      email: 'example@email.com',
      name: 'example',
    }
    // const response = await httpClient.get(`/users/${id}`);
    // return response.data;
  }

  async login(email: string, password: string): Promise<{ token: string; data: User }> {
    // For mock login
    return {
      token: 'mock token',
      data: {
        id: '1',
        email: email,
        name: email,
      },
    }
    // const response = await httpClient.post("/auth/signin", { email, password });
    // return response.data;
  }
}
