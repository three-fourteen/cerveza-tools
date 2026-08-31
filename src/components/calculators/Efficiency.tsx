import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { efficiencyCalc } from '../../calculators'
import { useCalculator } from './useCalculator'
import { t, useLocale, type Locale } from '../../i18n'

interface EfficiencyProps {
  title?: string
  intro?: string
  locale?: Locale
}

function Efficiency({ title, intro, locale }: EfficiencyProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [theoreticalDensity, setTheoreticalDensity] = useState('')
  const [actualDensity, setActualDensity] = useState('')
  const { result, error, calculate, clear: clearCalc } = useCalculator(() =>
    efficiencyCalc(theoreticalDensity, actualDensity, activeLocale),
  )

  function clear() {
    setTheoreticalDensity('')
    setActualDensity('')
    clearCalc()
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField
        label={t(activeLocale, 'calculators.efficiency.labelTheoretical')}
        name="theoreticalDensity"
        handleInputChange={(v) => setTheoreticalDensity(v)}
        placeholder={t(activeLocale, 'calculators.efficiency.placeholderTheoretical')}
        value={theoreticalDensity}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.efficiency.labelActual')}
        name="actualDensity"
        handleInputChange={(v) => setActualDensity(v)}
        placeholder={t(activeLocale, 'calculators.efficiency.placeholderActual')}
        value={actualDensity}
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
          {t(activeLocale, 'calculators.efficiency.result')} <strong>{result.efficiencyCalcValue}</strong>
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default Efficiency
