import React, { useState } from 'react'

export const PageLayout = ({
  children,
  defaultCollapsed = false,
  menuChildren,
  menuFooter,
  menuHeader,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
  menuHeader?: React.ReactNode
  menuChildren: React.ReactNode
  menuFooter: (collapsed: boolean) => React.ReactNode
}) => {
  const [menuCollapsed, setMenuCollapsed] = useState(defaultCollapsed)

  return (
    <div className="w-full h-screen bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 grid grid-cols-[max-content_1fr] p-2 gap-2">
      <aside
        className={[
          'bg-white dark:bg-slate-900 h-full rounded shadow grid grid-rows-[max-content_1fr_max-content] p-2 gap-2 transition-all duration-300 ease-in-out overflow-hidden',
          menuCollapsed ? 'w-12' : 'w-64',
        ].join(' ')}
      >
        <section
          className={
            'border-b dark:border-slate-700 pb-2 flex items-center ' +
            (menuCollapsed ? 'justify-end' : 'justify-between')
          }
        >
          {menuCollapsed ? null : menuHeader}
          <button
            className={
              'border w-8 h-8 flex items-center justify-center rounded-sm dark:border-slate-700'
            }
            onClick={() => setMenuCollapsed((val) => !val)}
          >
            {menuCollapsed ? '>' : '<'}
          </button>
        </section>

        {menuCollapsed ? <section /> : menuChildren}

        <section
          className={'flex items-center border-t pt-2 dark:border-slate-700'}
        >
          {menuFooter(menuCollapsed)}
        </section>
      </aside>

      <main className={'bg-white dark:bg-slate-900 h-full rounded shadow'}>
        <div className={`px-8 pt-8`}>{children}</div>
      </main>
    </div>
  )
}
