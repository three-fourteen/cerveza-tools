import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { strikeCalc } from '../../calculators'

interface MashTemperatureProps {
  title?: string
  intro?: string
}

function MashTemperature({ title, intro }: MashTemperatureProps) {
  const errorId = useId()
  const [thick, setThick] = useState('')
  const [strtemp, setStrtemp] = useState('')
  const [grntemp, setGrntemp] = useState('')
  const [result, setResult] = useState<{ strikeCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(strikeCalc(thick, strtemp, grntemp))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setThick('')
    setStrtemp('')
    setGrntemp('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField label="Litros de agua por Kg de grano" name="thick" handleInputChange={(v) => setThick(v)} placeholder="ej: 3" value={thick} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      <NumericField label="Temperatura objetivo del macerado" name="strtemp" handleInputChange={(v) => setStrtemp(v)} placeholder="ej: 67" value={strtemp} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      <NumericField label="Temperatura del grano" name="grntemp" handleInputChange={(v) => setGrntemp(v)} placeholder="ej: 18" value={grntemp} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      {error && <p id={errorId} role="alert" style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p>La temperatura del agua tiene que ser de: <strong>{result.strikeCalcValue}</strong>ºC</p>
      )}
      <Button onClick={calculate} label="Calcular" />
      <Button onClick={clear} label="Limpiar" />
    </div>
  )
}

export default MashTemperature
