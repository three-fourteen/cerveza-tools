import React from 'react'
import { InitialDensity } from '../../../src'
import CalculatorLayout from '../CalculatorLayout'

export default function InitialDensityPage() {
  return (
    <CalculatorLayout>
      <InitialDensity
        title="📊 Densidad Inicial"
        intro="A partir de la densidad y volumen que quieres tener después del hervido, calcula cuál debe ser tu densidad y volumen antes de empezar."
      />
    </CalculatorLayout>
  )
}
