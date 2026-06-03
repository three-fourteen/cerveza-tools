import React from 'react'
import { WaterDilution } from '../../../src'
import CalculatorLayout from '../CalculatorLayout'

export default function WaterDilutionPage() {
  return (
    <CalculatorLayout>
      <WaterDilution
        title="💧 Dilución con Agua"
        intro="Si tu densidad es más alta de lo esperado, calcula cuántos litros de agua debes añadir para alcanzar la densidad objetivo."
      />
    </CalculatorLayout>
  )
}
