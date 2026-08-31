import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { dilutionCalc } from '../../calculators'

interface WaterDilutionProps {
  title?: string
  intro?: string
}

function WaterDilution({ title, intro }: WaterDilutionProps) {
  const errorId = useId()
  const [DO, setDO] = useState('')
  const [volume, setVolume] = useState('')
  const [DF, setDF] = useState('')
  const [result, setResult] = useState<{ dilutionCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(dilutionCalc(DO, DF, volume))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setDO('')
    setVolume('')
    setDF('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField label="Densidad actual" name="DO" handleInputChange={(v) => setDO(v)} placeholder="ej: 1052" value={DO} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      <NumericField label="Volumen en litros" name="volume" handleInputChange={(v) => setVolume(v)} placeholder="ej: 20" value={volume} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      <NumericField label="Densidad objetivo" name="DF" handleInputChange={(v) => setDF(v)} placeholder="ej: 1042" value={DF} maxLength={4} ariaDescribedby={error ? errorId : undefined} />
      {error && <p id={errorId} role="alert" style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p>Añadir agua: <strong>{result.dilutionCalcValue}</strong></p>
      )}
      <Button onClick={calculate} label="Calcular" />
      <Button onClick={clear} label="Limpiar" />
    </div>
  )
}

export default WaterDilution
