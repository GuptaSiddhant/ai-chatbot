import React from 'react'
import clsx from 'clsx'
import { CommonUIProps } from 'common/types'
export enum TextTypes {
  'h1',
  'h2',
  'h3',
  'h4',
  'body',
  'caption',
  'subtitle1',
  'subtitle2',
  'impact',
}
export type TextType = keyof typeof TextTypes

export interface ITextProps extends CommonUIProps {
  type?: TextType
  text?: string
  children?: React.ReactNode
  bottomMargin?: 'small' | 'large'
}

export const Text: React.FC<ITextProps> = ({
  type = 'body',
  text,
  additionalClassName,
  children,
  bottomMargin = 0,
}) => {
  const textColor = clsx(
    (type === 'h1' || type === 'h2' || type === 'h3' || type === 'subtitle1') &&
      'text-black',

    (type === 'h4' ||
      type === 'body' ||
      type === 'caption' ||
      type === 'subtitle2') &&
      'text-secondary-gray',

    'dark:text-gray-300',
  )

  const bottomMarginClass = clsx(
    bottomMargin === 'small' && 'mb-4',
    bottomMargin === 'large' && 'mb-8',
  )

  switch (type) {
    case 'impact':
      return (
        <h1
          className={clsx(
            textColor,
            bottomMarginClass,
            `text-6xl sm:text-8xl md:text-9xl font-extrabold ${additionalClassName}`,
          )}
        >
          {text || children}
        </h1>
      )
    case 'h1':
      return (
        <h1
          className={clsx(
            textColor,
            bottomMarginClass,
            `text-3xl sm:text-4xl md:text-6xl font-extrabold ${additionalClassName}`,
          )}
        >
          {text || children}
        </h1>
      )
    case 'h2':
      return (
        <h2
          className={clsx(
            textColor,
            bottomMarginClass,
            `text-xl sm:text-3xl font-extrabold ${additionalClassName}`,
          )}
        >
          {text || children}
        </h2>
      )
    case 'h3':
      return (
        <h3
          className={clsx(
            textColor,
            bottomMarginClass,
            `text-xl sm:text-3xl ${additionalClassName}`,
          )}
        >
          {text || children}
        </h3>
      )
    case 'h4':
      return (
        <h4
          className={clsx(
            textColor,
            bottomMarginClass,
            `text-lg sm:text-xl font-semibold ${additionalClassName}`,
          )}
        >
          {text || children}
        </h4>
      )
    case 'body':
      return (
        <div className={clsx(textColor, bottomMarginClass, 'text-base')}>
          {text || children}
        </div>
      )
    case 'caption':
      return (
        <div className={clsx(textColor, bottomMarginClass, 'text-sm')}>
          {text || children}
        </div>
      )
    case 'subtitle1':
      return (
        <div className={clsx(textColor, bottomMarginClass, 'text-base ')}>
          {text || children}
        </div>
      )
    case 'subtitle2':
      return (
        <div
          className={clsx(textColor, bottomMarginClass, 'text-sm font-medium')}
        >
          {text || children}
        </div>
      )

    default:
      return <div className="dark:text-white">{text || children}</div>
  }
}
