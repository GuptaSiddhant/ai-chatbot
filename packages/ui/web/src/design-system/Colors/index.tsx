import React from 'react'
import { ColorItem } from '../ColorItem'

export function Colors({ colors }: { colors: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
      {colors.map((color) => (
        <ColorItem color={color} key={color} />
      ))}
    </div>
  )
}
