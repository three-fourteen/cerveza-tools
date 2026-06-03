import React from 'react'
import { Evaporation } from '../../../src'
import CalculatorLayout from '../CalculatorLayout'

export default function EvaporationPage() {
  return (
    <CalculatorLayout>
      <Evaporation
        title="💨 Evaporación"
        intro="Calcula la tasa de evaporación de tu sistema (L/h) y el volumen final después del hervido. El volumen estimado no incluye pérdidas por tubos o enfriadores."
      />
    </CalculatorLayout>
  )
}
