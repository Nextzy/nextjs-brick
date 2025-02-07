'use client'
import { useUserStore } from '@application/state/UserStore'
import { Link, usePathname } from '@i18n/routing'
import { useTranslations } from 'next-intl'
import ButtonStyle from './ButtonStyle'

export default function Navbar() {
  const { user } = useUserStore()
  const t = useTranslations('home')
  const pathname = usePathname()

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center sticky top-0">
      <Link href="/">{t('home')}</Link>
      <ul className="flex gap-5 items-center">
        <li className="flex items-center gap-2">
          <Link href={`${pathname}`} locale="th">
            <ButtonStyle className="hover:text-black cursor-pointer">TH</ButtonStyle>
          </Link>
          <div>
            <Link href={`${pathname}`} locale="en">
              <ButtonStyle className="hover:text-black cursor-pointer">EN</ButtonStyle>
            </Link>
          </div>
        </li>
        {user ? (
          <li>
            <Link href={`/profile/${user.id}`}>{t('profile')}</Link>
          </li>
        ) : (
          <li>
            <Link href="/login">{t('login')}</Link>
          </li>
        )}
      </ul>
    </header>
  )
}
