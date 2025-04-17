import { Outlet } from 'react-router-dom'
import Header from '@shared/components/Header'
import Footer from '@shared/components/Footer'

function RootApp() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootApp
