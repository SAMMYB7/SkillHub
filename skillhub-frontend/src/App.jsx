import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRouter from './router/AppRouter.jsx'

function App() {

  return (
    <>
      <AppRouter />
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#14b8a6',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
        }} 
      />
    </>
  )
}

export default App
