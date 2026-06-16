import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- Tambahkan import ini
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* <-- Bungkus App dengan ini */}
      <App />
    </BrowserRouter> {/* <-- Tutup di sini */}
  </StrictMode>,
)