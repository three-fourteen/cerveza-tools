import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { carbonationCalc } from '../../calculators'
import { useCalculator } from './useCalculator'
import { t, useLocale, type Locale } from '../../i18n'

interface CarbonationProps {
  title?: string
  intro?: string
  locale?: Locale
}

function Carbonation({ title, intro, locale }: CarbonationProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [volume, setVolume] = useState('')
  const [targetCO2, setTargetCO2] = useState('')
  const [residualCO2, setResidualCO2] = useState('')
  const { result, error, calculate, clear: clearCalc } = useCalculator(() =>
    carbonationCalc(volume, targetCO2, residualCO2, activeLocale),
  )

  function clear() {
    setVolume('')
    setTargetCO2('')
    setResidualCO2('')
    clearCalc()
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField
        label={t(activeLocale, 'calculators.carbonation.labelVolume')}
        name="volume"
        handleInputChange={(v) => setVolume(v)}
        placeholder={t(activeLocale, 'calculators.carbonation.placeholderVolume')}
        value={volume}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.carbonation.labelTargetCO2')}
        name="targetCO2"
        handleInputChange={(v) => setTargetCO2(v)}
        placeholder={t(activeLocale, 'calculators.carbonation.placeholderTargetCO2')}
        value={targetCO2}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.carbonation.labelResidualCO2')}
        name="residualCO2"
        handleInputChange={(v) => setResidualCO2(v)}
        placeholder={t(activeLocale, 'calculators.carbonation.placeholderResidualCO2')}
        value={residualCO2}
        ariaDescribedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}
      {result && (
        <p>
          {t(activeLocale, 'calculators.carbonation.result')} <strong>{result.carbonationCalcValue} g</strong>
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default Carbonation
