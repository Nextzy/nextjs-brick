'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const NotFound = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 200000)
  }, [])
  return (
    <div className="flex-grow">
      <div className="w-full h-full flex items-center justify-center">
        <p>Not Found Page - 404</p>
      </div>
    </div>
  )
}

export default NotFound
