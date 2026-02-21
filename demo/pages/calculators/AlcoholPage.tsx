import React from 'react'
import { Alcohol } from '../../../src'
import CalculatorLayout from '../CalculatorLayout'

export default function AlcoholPage() {
  return (
    <CalculatorLayout>
      <Alcohol
        title="🍺 Alcohol y Atenuación"
        intro="Calcula el contenido en alcohol (% Vol.) y la atenuación aparente a partir de la densidad inicial y final de tu cerveza."
      />
    </CalculatorLayout>
  )
}
