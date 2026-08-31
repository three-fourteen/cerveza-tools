import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { mashVolCalc } from '../../calculators'
import { t, useLocale, type Locale } from '../../i18n'

interface MashVolumeProps {
  title?: string
  intro?: string
  locale?: Locale
}

function MashVolume({ title, intro, locale }: MashVolumeProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [weight, setWeight] = useState('')
  const [thick, setThick] = useState('')
  const [result, setResult] = useState<{ mashVolCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(mashVolCalc(weight, thick, activeLocale))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setWeight('')
    setThick('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField
        label={t(activeLocale, 'calculators.mashVolume.labelWeight')}
        name="weight"
        handleInputChange={(v) => setWeight(v)}
        placeholder={t(activeLocale, 'calculators.mashVolume.placeholderWeight')}
        value={weight}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.mashVolume.labelThick')}
        name="thick"
        handleInputChange={(v) => setThick(v)}
        placeholder={t(activeLocale, 'calculators.mashVolume.placeholderThick')}
        value={thick}
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
          {t(activeLocale, 'calculators.mashVolume.result')} <strong>{result.mashVolCalcValue}</strong> L
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default MashVolume
