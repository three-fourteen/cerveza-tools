import React, { useState } from 'react'
import { NumericField, Button } from '../form'
import { hydrometerCorrection } from '../../calculators'

interface HydrometerProps {
  title?: string
  intro?: string
}

function Hydrometer({ title, intro }: HydrometerProps) {
  const [hydrometer, setHydrometer] = useState('')
  const [temp, setTemp] = useState('')
  const [cTemp, setCTemp] = useState('')
  const [result, setResult] = useState<{ cHydrometer: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(hydrometerCorrection(hydrometer, temp, cTemp))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setHydrometer('')
    setTemp('')
    setCTemp('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField label="Densidad" name="hydrometer" handleInputChange={(v) => setHydrometer(v)} placeholder="ej: 1040" value={hydrometer} maxLength={4} />
      <NumericField label="Temperatura (ºC)" name="temp" handleInputChange={(v) => setTemp(v)} placeholder="ej: 67" value={temp} />
      <NumericField label="Temperatura ajuste densimetro (ºC)" name="cTemp" handleInputChange={(v) => setCTemp(v)} placeholder="Ej: 20" value={cTemp} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p>
          La densidad corregida es: <strong>{result.cHydrometer}</strong>
        </p>
      )}
      <Button onClick={calculate} label="Calcular" />
      <Button onClick={clear} label="Limpiar" />
    </div>
  )
}

export default Hydrometer
