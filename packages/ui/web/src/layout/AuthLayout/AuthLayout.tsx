export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 max-w-80 p-4 rounded shadow">
        {children}
      </div>
    </div>
  )
}
