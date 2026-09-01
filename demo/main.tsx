import React from 'react'
import { createRoot } from 'react-dom/client'
import { registerBrewingCalculatorTools } from '../src/webmcp'
import App from './App'
import './styles.css'

void registerBrewingCalculatorTools({ calculators: 'all', locale: 'es' })

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
