import { User } from '@domain/models/User'
import { create } from 'zustand'

interface UserState {
  user: {
    id: string
    name: string
    email: string
  } | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}))
