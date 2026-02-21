import React from 'react'
import { Link } from 'react-router-dom'

interface CalculatorLayoutProps {
  children: React.ReactNode
}

export default function CalculatorLayout({ children }: CalculatorLayoutProps) {
  return (
    <main className="page">
      <nav className="breadcrumb">
        <Link to="/">← Volver al inicio</Link>
      </nav>
      <div className="calculator-wrapper">{children}</div>
    </main>
  )
}
