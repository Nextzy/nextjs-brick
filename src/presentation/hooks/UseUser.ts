import { useState, useEffect } from 'react'
import { User } from '@domain/models/User'
import { UserService } from '@application/services/UserService'
import { UserApi } from '@infrastructure/api/UserApi'
import { useUserStore } from '@application/state/UserStore'

export const useUser = (id: string) => {
  const { user, setUser } = useUserStore()
  const userService = new UserService(new UserApi())

  useEffect(() => {
    userService.fetchUser(id).then(data => setUser(data))
  }, [id])

  return user
}
