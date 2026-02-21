import React, { useState } from 'react'
import { NumericField, Button } from '../form'
import { alcoholCalc } from '../../calculators'

interface AlcoholProps {
  title?: string
  intro?: string
}

function Alcohol({ title, intro }: AlcoholProps) {
  const [DO, setDO] = useState('')
  const [DF, setDF] = useState('')
  const [result, setResult] = useState<{ alcoholCalcValue: string; attenuationCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(alcoholCalc(DO, DF))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setDO('')
    setDF('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField label="Densidad inicial" name="DO" handleInputChange={(v) => setDO(v)} placeholder="ej: 1045" value={DO} maxLength={4} />
      <NumericField label="Densidad final" name="DF" handleInputChange={(v) => setDF(v)} placeholder="ej: 1012" value={DF} maxLength={4} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <p>
          Volumen de alcohol: <strong>{result.alcoholCalcValue}</strong>
          <br />
          Atenuación: <strong>{result.attenuationCalcValue}</strong>
        </p>
      )}
      <Button onClick={calculate} label="Calcular" />
      <Button onClick={clear} label="Limpiar" />
    </div>
  )
}

export default Alcohol
