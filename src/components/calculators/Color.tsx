import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { colorCalc } from '../../calculators'
import { useCalculator } from './useCalculator'
import { t, useLocale, type Locale } from '../../i18n'

interface ColorProps {
  title?: string
  intro?: string
  locale?: Locale
}

function Color({ title, intro, locale }: ColorProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [weight, setWeight] = useState('')
  const [colorLovibond, setColorLovibond] = useState('')
  const [volume, setVolume] = useState('')
  const { result, error, calculate, clear: clearCalc } = useCalculator(() =>
    colorCalc(weight, colorLovibond, volume, activeLocale),
  )

  function clear() {
    setWeight('')
    setColorLovibond('')
    setVolume('')
    clearCalc()
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField
        label={t(activeLocale, 'calculators.color.labelWeight')}
        name="weight"
        handleInputChange={(v) => setWeight(v)}
        placeholder={t(activeLocale, 'calculators.color.placeholderWeight')}
        value={weight}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.color.labelLovibond')}
        name="colorLovibond"
        handleInputChange={(v) => setColorLovibond(v)}
        placeholder={t(activeLocale, 'calculators.color.placeholderLovibond')}
        value={colorLovibond}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.color.labelVolume')}
        name="volume"
        handleInputChange={(v) => setVolume(v)}
        placeholder={t(activeLocale, 'calculators.color.placeholderVolume')}
        value={volume}
        ariaDescribedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}
      {result && (
        <p>
          {t(activeLocale, 'calculators.color.resultSrm')} <strong>{result.srmCalcValue}</strong>
          <br />
          {t(activeLocale, 'calculators.color.resultEbc')} <strong>{result.ebcCalcValue}</strong>
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default Color
