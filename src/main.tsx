import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#171717',
            color: '#fff',
            border: '1px solid #D4AF37',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#080808',
            },
          },
          error: {
            iconTheme: {
              primary: '#CC092F',
              secondary: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)