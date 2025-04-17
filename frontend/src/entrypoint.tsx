import { createRoot } from 'react-dom/client'
import './index.css'
import { AppWrapper } from './app/react/AppWrapper'

createRoot(document.getElementById('root')!).render(
  <AppWrapper />
)
