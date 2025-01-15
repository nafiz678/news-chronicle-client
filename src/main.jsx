import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routes.jsx'
import { ThemeProvider } from './provider/theme-provider'
import AuthProvider from './provider/AuthProvider'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <HelmetProvider>
          <ThemeProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </ThemeProvider>
        </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
