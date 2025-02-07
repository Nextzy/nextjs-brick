import { useState } from 'react'
import { useAuth } from '@presentation/hooks/UseAuth'
import { useTranslations } from 'next-intl'

export default function LoginForm() {
  const t = useTranslations('login')
  const { login, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">      
      <h2 className="text-xl font-bold mb-4">{t('welcome')}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col" style={{ gap: 20 }}>
        <input
          type="email"
          placeholder={t('email')}
          className="w-full p-2 border rounded mb-2"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t('password')}
          autoComplete="currentPassword"
          className="w-full p-2 border rounded mb-2"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {t('button')}
        </button>
      </form>
    </div>
  )
}
