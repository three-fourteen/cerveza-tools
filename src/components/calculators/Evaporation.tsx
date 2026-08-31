import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { evaporationCalc } from '../../calculators'

interface EvaporationProps {
  title?: string
  intro?: string
}

function Evaporation({ title, intro }: EvaporationProps) {
  const errorId = useId()
  const [densityBefore, setDensityBefore] = useState('')
  const [volume, setVolume] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [densityAfter, setDensityAfter] = useState('')
  const [result, setResult] = useState<{ evaporationResult: string; volumeEvaporationResult: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(evaporationCalc(densityBefore, volume, timeValue, densityAfter))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setDensityBefore('')
    setVolume('')
    setTimeValue('')
    setDensityAfter('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField label="Densidad antes de hervir" name="densityBefore" handleInputChange={(v) => setDensityBefore(v)} placeholder="ej: 1040" value={densityBefore} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      <NumericField label="Volumen antes de hervir (litros)" name="volume" handleInputChange={(v) => setVolume(v)} placeholder="ej: 30" value={volume} ariaDescribedby={error ? errorId : undefined} />
      <NumericField label="Tiempo de hervido (minutos)" name="timeValue" handleInputChange={(v) => setTimeValue(v)} placeholder="Ej: 60" value={timeValue} ariaDescribedby={error ? errorId : undefined} />
      <NumericField label="Densidad después de hervir" name="densityAfter" handleInputChange={(v) => setDensityAfter(v)} placeholder="ej: 1050" value={densityAfter} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      {error && <p id={errorId} role="alert" style={{ color: 'red' }}>{error}</p>}
      {result && (
        <>
          <p>La perdida por evaporación es: <strong>{result.evaporationResult}</strong>L/h</p>
          <p>El volumen después de hervir es: <strong>{result.volumeEvaporationResult}</strong>L</p>
        </>
      )}
      <Button onClick={calculate} label="Calcular" />
      <Button onClick={clear} label="Limpiar" />
    </div>
  )
}

export default Evaporation
