import React from 'react'

export function ColorItem({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`p-2 rounded-full border border-secondary-medium 
        m-2 h-16 w-16   bg-${color}`}
      ></div>
      <div className={'text-xs font-medium'}>{color}</div>
    </div>
  )
}
