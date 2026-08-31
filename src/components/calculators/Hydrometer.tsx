import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { hydrometerCorrection } from '../../calculators'
import { t, useLocale, type Locale } from '../../i18n'

interface HydrometerProps {
  title?: string
  intro?: string
  locale?: Locale
}

function Hydrometer({ title, intro, locale }: HydrometerProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [hydrometer, setHydrometer] = useState('')
  const [temp, setTemp] = useState('')
  const [cTemp, setCTemp] = useState('')
  const [result, setResult] = useState<{ cHydrometer: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(hydrometerCorrection(hydrometer, temp, cTemp, activeLocale))
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
      <NumericField
        label={t(activeLocale, 'calculators.hydrometer.labelReading')}
        name="hydrometer"
        handleInputChange={(v) => setHydrometer(v)}
        placeholder={t(activeLocale, 'calculators.hydrometer.placeholderReading')}
        value={hydrometer}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.hydrometer.labelTemp')}
        name="temp"
        handleInputChange={(v) => setTemp(v)}
        placeholder={t(activeLocale, 'calculators.hydrometer.placeholderTemp')}
        value={temp}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.hydrometer.labelAdjustTemp')}
        name="cTemp"
        handleInputChange={(v) => setCTemp(v)}
        placeholder={t(activeLocale, 'calculators.hydrometer.placeholderAdjustTemp')}
        value={cTemp}
        ariaDescribedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}
      {result && (
        <p>
          {t(activeLocale, 'calculators.hydrometer.result')} <strong>{result.cHydrometer}</strong>
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default Hydrometer
