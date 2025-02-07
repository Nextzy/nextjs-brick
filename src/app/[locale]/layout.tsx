import { NextIntlClientProvider } from 'next-intl' // หากไม่ใช้ i18next ลบทิ้งได้เลย
import { getMessages } from 'next-intl/server' // หากไม่ใช้ i18next ลบทิ้งได้เลย
import { Locale, routing } from '@i18n/routing' // หากไม่ใช้ i18next ลบทิ้งได้เลย
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@components/Navbar'
import { notFound, redirect } from 'next/navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NextJS - Boiler Plate',
  description: 'NEXTZY | NEXTJS - BOILERPLATE',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()
  return (
    // ไม่ใช้ i18next ให้ลบ locale เป็น lang="th"
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ตรง NextIntlClient ลบทิ้งหากไม่ใช้ i18next */}
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex flex-grow p-6">{children}</main>
            <footer className="bg-gray-200 text-center p-4">Footer</footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
