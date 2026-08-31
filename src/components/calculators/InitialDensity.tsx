import React, { useState } from 'react'
import { NumericField, Button } from '../form'
import { initialCalc } from '../../calculators'

interface InitialDensityProps {
  title?: string
  intro?: string
}

function InitialDensity({ title, intro }: InitialDensityProps) {
  const [densityAfter, setDensityAfter] = useState('')
  const [volume, setVolume] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [evaporation, setEvaporation] = useState('')
  const [result, setResult] = useState<{ densityResult: string; volumeResult: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(initialCalc(densityAfter, volume, timeValue, evaporation))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setDensityAfter('')
    setVolume('')
    setTimeValue('')
    setEvaporation('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField label="Densidad después de hervir" name="densityAfter" handleInputChange={(v) => setDensityAfter(v)} placeholder="ej: 1060" value={densityAfter} maxLength={4} />
      <NumericField label="Volumen antes de hervir (litros)" name="volume" handleInputChange={(v) => setVolume(v)} placeholder="ej: 30" value={volume} />
      <NumericField label="Tiempo de hervido (minutos)" name="timeValue" handleInputChange={(v) => setTimeValue(v)} placeholder="Ej: 60" value={timeValue} />
      <NumericField label="Perdida de volumen en l/h" name="evaporation" handleInputChange={(v) => setEvaporation(v)} placeholder="Ej: 6" value={evaporation} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <>
          <p>La densidad antes de hervir deberá de ser de: <strong>{result.densityResult}</strong></p>
          <p>El volumen antes de hervir deberá de ser de: <strong>{result.volumeResult}</strong>L</p>
        </>
      )}
      <Button onClick={calculate} label="Calcular" />
      <Button onClick={clear} label="Limpiar" />
    </div>
  )
}

export default InitialDensity
