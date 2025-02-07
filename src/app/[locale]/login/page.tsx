'use client'
import LoginForm from '@components/LoginForm'
import { useAuth } from '@hooks/UseAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const { token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push('/')
    }
  }, [token, router])

  return (
    <div className="flex-grow">
      <div className="min-h-full flex items-center justify-center bg-gray-100">
        <LoginForm />
      </div>
    </div>
  )
}
