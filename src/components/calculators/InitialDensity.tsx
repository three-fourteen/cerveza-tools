import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { initialCalc } from '../../calculators'
import { t, useLocale, type Locale } from '../../i18n'

interface InitialDensityProps {
  title?: string
  intro?: string
  locale?: Locale
}

function InitialDensity({ title, intro, locale }: InitialDensityProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [densityAfter, setDensityAfter] = useState('')
  const [volume, setVolume] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [evaporation, setEvaporation] = useState('')
  const [result, setResult] = useState<{ densityResult: string; volumeResult: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(initialCalc(densityAfter, volume, timeValue, evaporation, activeLocale))
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
      <NumericField
        label={t(activeLocale, 'calculators.initialDensity.labelDensityAfter')}
        name="densityAfter"
        handleInputChange={(v) => setDensityAfter(v)}
        placeholder={t(activeLocale, 'calculators.initialDensity.placeholderDensityAfter')}
        value={densityAfter}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.initialDensity.labelVolume')}
        name="volume"
        handleInputChange={(v) => setVolume(v)}
        placeholder={t(activeLocale, 'calculators.initialDensity.placeholderVolume')}
        value={volume}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.initialDensity.labelTime')}
        name="timeValue"
        handleInputChange={(v) => setTimeValue(v)}
        placeholder={t(activeLocale, 'calculators.initialDensity.placeholderTime')}
        value={timeValue}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.initialDensity.labelEvaporation')}
        name="evaporation"
        handleInputChange={(v) => setEvaporation(v)}
        placeholder={t(activeLocale, 'calculators.initialDensity.placeholderEvaporation')}
        value={evaporation}
        ariaDescribedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}
      {result && (
        <>
          <p>
            {t(activeLocale, 'calculators.initialDensity.resultDensity')} <strong>{result.densityResult}</strong>
          </p>
          <p>
            {t(activeLocale, 'calculators.initialDensity.resultVolume')} <strong>{result.volumeResult}</strong>L
          </p>
        </>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default InitialDensity
