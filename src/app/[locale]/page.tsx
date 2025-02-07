'use client'
import React from 'react'
import { useUserStore } from '@application/state/UserStore'
import { useAuth } from '@presentation/hooks/UseAuth'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Home() {
  const { token, logout } = useAuth()
  const { user } = useUserStore()
  const t = useTranslations('home')

  return (
    <div className="p-6 w-max">
      <h1 className="text-xl font-bold">{t('welcome')}</h1>
      <p>สามารถอ่าน Docs ของ Project นี้ได้ที่</p>
      <div className="bg-zinc-200 px-10 py-5 rounded my-5">
        <ul className="flex flex-col list-disc">
          <li>README.md หรือ Next-js-clean-architecture.md ได้ใน root folder</li>
          <li className="font-bold text-lime-600 hover:text-lime-800">
            <Link
              target="_blank"
              href="https://wsg8729rzqch.sg.larksuite.com/wiki/VcJvwNwXniLvxQkznPclkEYAgef?from=from_copylink"
            >
              Docs
            </Link>
          </li>
        </ul>
      </div>
      {token ? (
        <div>
          <p>{t('name', { name: user?.email })}</p>
          <button onClick={logout} className="bg-red-500 text-white p-2 rounded mt-4">
            {t('logout')}
          </button>
        </div>
      ) : (
        <p>{t('welcome_2')}</p>
      )}
    </div>
  )
}
