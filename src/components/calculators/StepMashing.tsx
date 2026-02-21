import React, { useState } from 'react'
import { NumericField, Button } from '../form'
import { restCalc } from '../../calculators'

interface StepMashingProps {
  title?: string
  intro?: string
}

function StepMashing({ title, intro }: StepMashingProps) {
  const [weight, setWeight] = useState('')
  const [thick, setThick] = useState('')
  const [curtemp, setCurtemp] = useState('')
  const [tartemp, setTartemp] = useState('')
  const [result, setResult] = useState<{ restCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(restCalc(weight, thick, curtemp, tartemp))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setWeight('')
    setThick('')
    setCurtemp('')
    setTartemp('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField label="Peso del grano en Kg" name="weight" handleInputChange={(v) => setWeight(v)} placeholder="ej: 5" value={weight} maxLength={4} />
      <NumericField label="Litros de agua por Kg de grano" name="thick" handleInputChange={(v) => setThick(v)} placeholder="ej: 3" value={thick} maxLength={4} />
      <NumericField label="Temperatura actual (ºC)" name="curtemp" handleInputChange={(v) => setCurtemp(v)} placeholder="ej: 50" value={curtemp} maxLength={4} />
      <NumericField label="Temperatura objetivo (ºC)" name="tartemp" handleInputChange={(v) => setTartemp(v)} placeholder="ej: 60" value={tartemp} maxLength={4} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p>Litros de agua hirviendo (100ºC) que se deben añadir: <strong>{result.restCalcValue}</strong></p>
      )}
      <Button onClick={calculate} label="Calcular" />
      <Button onClick={clear} label="Limpiar" />
    </div>
  )
}

export default StepMashing
