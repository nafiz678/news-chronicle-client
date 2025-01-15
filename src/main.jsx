import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routes.jsx'
import { MantineProvider } from '@mantine/core'
import { ThemeProvider } from './provider/theme-provider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <MantineProvider>
        <RouterProvider router={router}></RouterProvider>
      </MantineProvider>
    </ThemeProvider>
  </StrictMode>,
)
