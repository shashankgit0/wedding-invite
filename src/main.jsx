import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeddingBooklet from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeddingBooklet />
  </StrictMode>
)
