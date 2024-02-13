import type { ForwardedRef } from 'react'

export interface CommonUIProps<ElementType = HTMLElement> {
  /** `className` for additional styling of component. */
  additionalClassName?: string
  ref?: ForwardedRef<ElementType>
}
