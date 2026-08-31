import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { strikeCalc } from '../../calculators'
import { t, useLocale, type Locale } from '../../i18n'

interface MashTemperatureProps {
  title?: string
  intro?: string
  locale?: Locale
}

function MashTemperature({ title, intro, locale }: MashTemperatureProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [thick, setThick] = useState('')
  const [strtemp, setStrtemp] = useState('')
  const [grntemp, setGrntemp] = useState('')
  const [result, setResult] = useState<{ strikeCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(strikeCalc(thick, strtemp, grntemp, activeLocale))
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
      <NumericField
        label={t(activeLocale, 'calculators.mashTemperature.labelThick')}
        name="thick"
        handleInputChange={(v) => setThick(v)}
        placeholder={t(activeLocale, 'calculators.mashTemperature.placeholderThick')}
        value={thick}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.mashTemperature.labelStrTemp')}
        name="strtemp"
        handleInputChange={(v) => setStrtemp(v)}
        placeholder={t(activeLocale, 'calculators.mashTemperature.placeholderStrTemp')}
        value={strtemp}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.mashTemperature.labelGrnTemp')}
        name="grntemp"
        handleInputChange={(v) => setGrntemp(v)}
        placeholder={t(activeLocale, 'calculators.mashTemperature.placeholderGrnTemp')}
        value={grntemp}
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
          {t(activeLocale, 'calculators.mashTemperature.result')} <strong>{result.strikeCalcValue}</strong>ºC
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default MashTemperature
