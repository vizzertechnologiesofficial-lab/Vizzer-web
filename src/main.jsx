import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Production uses real URLs (/privacy). Preview builds served from a sub path can
// switch with VITE_ROUTER=hash or VITE_ROUTER=memory.
const mode = import.meta.env.VITE_ROUTER
const Router = mode === 'hash' ? HashRouter : mode === 'memory' ? MemoryRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </Router>
  </React.StrictMode>,
)
