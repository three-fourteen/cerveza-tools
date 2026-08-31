import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { ibuCalc } from '../../calculators'
import { useCalculator } from './useCalculator'
import { t, useLocale, type Locale } from '../../i18n'

interface IbuProps {
  title?: string
  intro?: string
  locale?: Locale
}

function Ibu({ title, intro, locale }: IbuProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [weight, setWeight] = useState('')
  const [alphaAcid, setAlphaAcid] = useState('')
  const [boilTime, setBoilTime] = useState('')
  const [volume, setVolume] = useState('')
  const [gravity, setGravity] = useState('')
  const { result, error, calculate, clear: clearCalc } = useCalculator(() =>
    ibuCalc(weight, alphaAcid, boilTime, volume, gravity, activeLocale),
  )

  function clear() {
    setWeight('')
    setAlphaAcid('')
    setBoilTime('')
    setVolume('')
    setGravity('')
    clearCalc()
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField
        label={t(activeLocale, 'calculators.ibu.labelWeight')}
        name="weight"
        handleInputChange={(v) => setWeight(v)}
        placeholder={t(activeLocale, 'calculators.ibu.placeholderWeight')}
        value={weight}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.ibu.labelAlphaAcid')}
        name="alphaAcid"
        handleInputChange={(v) => setAlphaAcid(v)}
        placeholder={t(activeLocale, 'calculators.ibu.placeholderAlphaAcid')}
        value={alphaAcid}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.ibu.labelBoilTime')}
        name="boilTime"
        handleInputChange={(v) => setBoilTime(v)}
        placeholder={t(activeLocale, 'calculators.ibu.placeholderBoilTime')}
        value={boilTime}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.ibu.labelVolume')}
        name="volume"
        handleInputChange={(v) => setVolume(v)}
        placeholder={t(activeLocale, 'calculators.ibu.placeholderVolume')}
        value={volume}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.ibu.labelGravity')}
        name="gravity"
        handleInputChange={(v) => setGravity(v)}
        placeholder={t(activeLocale, 'calculators.ibu.placeholderGravity')}
        value={gravity}
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
          {t(activeLocale, 'calculators.ibu.result')} <strong>{result.ibuCalcValue}</strong>
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default Ibu
