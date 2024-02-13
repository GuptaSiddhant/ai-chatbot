import React from 'react'
import clsx from 'clsx'

type ButtonSizeType = 'small' | 'medium' | 'large'

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  size?: ButtonSizeType
  children: JSX.Element | string
}

export const Button: React.FC<IButtonProps> = ({
  primary = false,
  disabled = false,
  size = 'medium',
  children,
  ...rest
}) => {
  const variantClassName = clsx(
    primary
      ? 'text-white bg-primary-default hover:bg-primary-dark border-transparent'
      : 'text-secondary-default bg-white hover:bg-secondary-light border-secondary-light',
  )

  const sizeClassName = clsx(
    size === 'small' && 'py-1 px-2 text-xs',
    size === 'medium' && 'px-4 py-2 text-sm',
    size === 'large' && 'px-6 py-3 text-lg',
  )

  const finalClassName = clsx(
    'border rounded-md',
    'shadow-sm',
    'font-medium',
    'inline-flex items-center',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-medium',
    sizeClassName,
    variantClassName,
  )

  const disabledClassName = clsx(
    'border rounded-md',
    'shadow-sm',
    'font-medium',
    'inline-flex items-center',
    'text-white bg-gray-400 border-transparent',

    sizeClassName,
  )

  return (
    <button
      className={disabled ? disabledClassName : finalClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
