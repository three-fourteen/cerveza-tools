import React from 'react'
import { MashTemperature } from '../../../src'
import CalculatorLayout from '../CalculatorLayout'

export default function MashTemperaturePage() {
  return (
    <CalculatorLayout>
      <MashTemperature
        title="♨️ Temperatura del Macerado"
        intro="Calcula a qué temperatura debes calentar el agua de macerado (strike water) para alcanzar la temperatura objetivo una vez que se mezcle con el grano."
      />
    </CalculatorLayout>
  )
}
