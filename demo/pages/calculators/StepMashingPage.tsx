import React from 'react'
import { StepMashing } from '../../../src'
import CalculatorLayout from '../CalculatorLayout'

export default function StepMashingPage() {
  return (
    <CalculatorLayout>
      <StepMashing
        title="📈 Temperatura Escalonada"
        intro="Calcula cuántos litros de agua hirviendo (100 ºC) debes añadir al macerado para subir la temperatura de un escalón al siguiente."
      />
    </CalculatorLayout>
  )
}
