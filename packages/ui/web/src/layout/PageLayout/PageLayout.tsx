import React, { useState } from 'react'
import { Text } from '../../common'
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons'

export const PageLayout = ({
  children,
  defaultCollapsed = false,
  menuChildren,
  menuFooter,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
  menuChildren: React.ReactNode
  menuFooter: (collapsed: boolean) => React.ReactNode
}) => {
  const [menuCollapsed, setMenuCollapsed] = useState(defaultCollapsed)

  return (
    <div className="relative w-full h-screen bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 grid grid-rows-[max-content_1fr] md:grid-cols-[max-content_1fr] p-2 gap-2 overflow-hidden">
      <aside
        className={[
          'bg-white dark:bg-slate-900 h-max md:h-full rounded grid grid-rows-[max-content_1fr_max-content] p-2 gap-2 transition-[width] duration-300 ease-in-out overflow-hidden',
          menuCollapsed ? 'md:w-12' : 'md:w-64',
        ].join(' ')}
      >
        <section className={'flex items-center justify-between'}>
          <div className={menuCollapsed ? 'md:hidden' : ''}>
            <Text type={'h4'}>DDP Chatbot</Text>
          </div>
          <button
            className={
              'border w-8 h-8 flex items-center justify-center rounded-sm dark:border-slate-700 rotate-90 md:rotate-0'
            }
            onClick={() => setMenuCollapsed((val) => !val)}
          >
            {menuCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </section>

        <section
          className={
            'min-h-0 overflow-hidden border-t pt-2 dark:border-slate-700 ' +
            (menuCollapsed ? 'hidden md:flex' : '')
          }
        >
          {menuCollapsed ? null : menuChildren}
        </section>

        <section
          className={
            'items-center border-t pt-2 dark:border-slate-700 ' +
            (menuCollapsed ? 'hidden md:flex' : '')
          }
        >
          {menuFooter(menuCollapsed)}
        </section>
      </aside>

      <main
        className={
          'bg-white dark:bg-slate-900 rounded shadow h-auto md:h-[calc(100vh_-_1rem)] overflow-hidden'
        }
      >
        {children}
      </main>
    </div>
  )
}
