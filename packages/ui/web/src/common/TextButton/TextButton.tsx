import React from 'react'

export interface ITextButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export const TextButton = ({ children, onClick }: ITextButtonProps) => {
  return (
    <span className={`cursor-pointer underline`} onClick={onClick}>
      {children}
    </span>
  )
}
