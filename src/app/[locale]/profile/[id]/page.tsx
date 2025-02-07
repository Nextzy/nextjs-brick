'use client'
import { useUser } from '@hooks/UseUser'
import { use } from 'react'
import ButtonStyle from '@components/ButtonStyle'
import styled from '@emotion/styled'
import { useTranslations } from 'next-intl'

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const user = useUser(id)
  const t = useTranslations('profile')
  const Container = styled.div`
    max-width: 1020px;
    width: 100%;
    background-color: white;
    border: 1px solid black;
    border-radius: 20px;
    padding: 20px;
    margin: 0 auto;
  `

  return (
    <div>
      {user ? (
        <div className="w-full">
          <Container>
            <p>{t('welcome')}</p>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p>{user.email}</p>
            <ButtonStyle className="hover:scale-120 scale-100">Styled Button</ButtonStyle>
          </Container>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
