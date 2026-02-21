import React from 'react'
import { MashVolume } from '../../../src'
import CalculatorLayout from '../CalculatorLayout'

export default function MashVolumePage() {
  return (
    <CalculatorLayout>
      <MashVolume
        title="🪣 Volumen del Macerado"
        intro="Estima el volumen total que ocupará el macerado (agua + grano). Úsalo para comprobar si tu macerador tiene capacidad suficiente."
      />
    </CalculatorLayout>
  )
}
