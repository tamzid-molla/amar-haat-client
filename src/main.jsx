import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="bg-bgPrimary max-w-[2500px] mx-auto">
    <RouterProvider router={router}>
    </RouterProvider>
    </div>
  </StrictMode>,
)
