import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { alcoholCalc } from '../../calculators'
import { t, useLocale, type Locale } from '../../i18n'

interface AlcoholProps {
  title?: string
  intro?: string
  locale?: Locale
}

function Alcohol({ title, intro, locale }: AlcoholProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [DO, setDO] = useState('')
  const [DF, setDF] = useState('')
  const [result, setResult] = useState<{ alcoholCalcValue: string; attenuationCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(alcoholCalc(DO, DF, activeLocale))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setDO('')
    setDF('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField
        label={t(activeLocale, 'calculators.alcohol.labelDO')}
        name="DO"
        handleInputChange={(v) => setDO(v)}
        placeholder={t(activeLocale, 'calculators.alcohol.placeholderDO')}
        value={DO}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.alcohol.labelDF')}
        name="DF"
        handleInputChange={(v) => setDF(v)}
        placeholder={t(activeLocale, 'calculators.alcohol.placeholderDF')}
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
          {t(activeLocale, 'calculators.alcohol.resultAlcohol')} <strong>{result.alcoholCalcValue}</strong>
          <br />
          {t(activeLocale, 'calculators.alcohol.resultAttenuation')} <strong>{result.attenuationCalcValue}</strong>
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default Alcohol
