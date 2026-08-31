import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { dilutionCalc } from '../../calculators'
import { t, useLocale, type Locale } from '../../i18n'

interface WaterDilutionProps {
  title?: string
  intro?: string
  locale?: Locale
}

function WaterDilution({ title, intro, locale }: WaterDilutionProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [DO, setDO] = useState('')
  const [volume, setVolume] = useState('')
  const [DF, setDF] = useState('')
  const [result, setResult] = useState<{ dilutionCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(dilutionCalc(DO, DF, volume, activeLocale))
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
      <NumericField
        label={t(activeLocale, 'calculators.waterDilution.labelDO')}
        name="DO"
        handleInputChange={(v) => setDO(v)}
        placeholder={t(activeLocale, 'calculators.waterDilution.placeholderDO')}
        value={DO}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.waterDilution.labelVolume')}
        name="volume"
        handleInputChange={(v) => setVolume(v)}
        placeholder={t(activeLocale, 'calculators.waterDilution.placeholderVolume')}
        value={volume}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.waterDilution.labelDF')}
        name="DF"
        handleInputChange={(v) => setDF(v)}
        placeholder={t(activeLocale, 'calculators.waterDilution.placeholderDF')}
        value={DF}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}
      {result && (
        <p>
          {t(activeLocale, 'calculators.waterDilution.result')} <strong>{result.dilutionCalcValue}</strong>
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default WaterDilution
