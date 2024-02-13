import React from 'react'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen dark:bg-slate-800 dark:text-slate-100">
      <div className={`max-w-4xl mx-auto px-8 pt-8`}>{children}</div>
    </div>
  )
}
