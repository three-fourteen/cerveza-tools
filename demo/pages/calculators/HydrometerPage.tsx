import React from 'react'
import { Hydrometer } from '../../../src'
import CalculatorLayout from '../CalculatorLayout'

export default function HydrometerPage() {
  return (
    <CalculatorLayout>
      <Hydrometer
        title="🌡️ Corrección Densímetro"
        intro="Los densímetros están calibrados a una temperatura estándar (normalmente 20 ºC). Si mides a una temperatura diferente, el resultado necesita corrección."
      />
    </CalculatorLayout>
  )
}
