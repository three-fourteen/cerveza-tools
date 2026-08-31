import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { mashVolCalc } from '../../calculators'

interface MashVolumeProps {
  title?: string
  intro?: string
}

function MashVolume({ title, intro }: MashVolumeProps) {
  const errorId = useId()
  const [weight, setWeight] = useState('')
  const [thick, setThick] = useState('')
  const [result, setResult] = useState<{ mashVolCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(mashVolCalc(weight, thick))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setWeight('')
    setThick('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField label="Peso del grano en Kg" name="weight" handleInputChange={(v) => setWeight(v)} placeholder="ej: 5" value={weight} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      <NumericField label="Litros de agua por Kg de grano" name="thick" handleInputChange={(v) => setThick(v)} placeholder="ej: 3" value={thick} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      {error && <p id={errorId} role="alert" style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p>El macerado ocupara un volumen de: <strong>{result.mashVolCalcValue}</strong> L</p>
      )}
      <Button onClick={calculate} label="Calcular" />
      <Button onClick={clear} label="Limpiar" />
    </div>
  )
}

export default MashVolume
