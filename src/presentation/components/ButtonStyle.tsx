import React from 'react'
import styled from '@emotion/styled'

const StyledButton = styled.button`
  padding: 10px;
  background-color: black;
  border: 1px solid black;
  border-radius: 10px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: white;
  }
`

const ButtonStyle = ({ children, className }: { children: string; className?: string }) => {
  return (
    <StyledButton type="button" className={className}>
      {children}
    </StyledButton>
  )
}

export default ButtonStyle
