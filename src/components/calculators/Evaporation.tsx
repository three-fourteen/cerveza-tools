import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { evaporationCalc } from '../../calculators'
import { t, useLocale, type Locale } from '../../i18n'

interface EvaporationProps {
  title?: string
  intro?: string
  locale?: Locale
}

function Evaporation({ title, intro, locale }: EvaporationProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [densityBefore, setDensityBefore] = useState('')
  const [volume, setVolume] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [densityAfter, setDensityAfter] = useState('')
  const [result, setResult] = useState<{ evaporationResult: string; volumeEvaporationResult: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(evaporationCalc(densityBefore, volume, timeValue, densityAfter, activeLocale))
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
      <NumericField
        label={t(activeLocale, 'calculators.evaporation.labelDensityBefore')}
        name="densityBefore"
        handleInputChange={(v) => setDensityBefore(v)}
        placeholder={t(activeLocale, 'calculators.evaporation.placeholderDensityBefore')}
        value={densityBefore}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.evaporation.labelVolume')}
        name="volume"
        handleInputChange={(v) => setVolume(v)}
        placeholder={t(activeLocale, 'calculators.evaporation.placeholderVolume')}
        value={volume}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.evaporation.labelTime')}
        name="timeValue"
        handleInputChange={(v) => setTimeValue(v)}
        placeholder={t(activeLocale, 'calculators.evaporation.placeholderTime')}
        value={timeValue}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.evaporation.labelDensityAfter')}
        name="densityAfter"
        handleInputChange={(v) => setDensityAfter(v)}
        placeholder={t(activeLocale, 'calculators.evaporation.placeholderDensityAfter')}
        value={densityAfter}
        maxLength={4}
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
            {t(activeLocale, 'calculators.evaporation.resultRate')} <strong>{result.evaporationResult}</strong>L/h
          </p>
          <p>
            {t(activeLocale, 'calculators.evaporation.resultVolume')}{' '}
            <strong>{result.volumeEvaporationResult}</strong>L
          </p>
        </>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default Evaporation
