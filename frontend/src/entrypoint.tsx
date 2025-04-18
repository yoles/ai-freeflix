import { createRoot } from 'react-dom/client'
import './entrypoint.css'
import { AppWrapper } from './app/react/AppWrapper'

createRoot(document.getElementById('root')!).render(
  <AppWrapper />
)
