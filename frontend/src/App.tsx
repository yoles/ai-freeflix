import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header will be added here */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      {/* Footer will be added here */}
    </div>
  )
}

export default App
