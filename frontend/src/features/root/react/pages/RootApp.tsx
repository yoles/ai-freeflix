import { Outlet } from 'react-router-dom'
import Header from '@features/root/react/sections/header/Header'

function RootApp() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
    </div>
  )
}

export default RootApp
