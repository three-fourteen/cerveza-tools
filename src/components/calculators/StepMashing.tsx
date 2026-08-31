import React, { useState, useId } from 'react'
import { NumericField, Button } from '../form'
import { restCalc } from '../../calculators'
import { t, useLocale, type Locale } from '../../i18n'

interface StepMashingProps {
  title?: string
  intro?: string
  locale?: Locale
}

function StepMashing({ title, intro, locale }: StepMashingProps) {
  const contextLocale = useLocale()
  const activeLocale = locale ?? contextLocale
  const errorId = useId()
  const [weight, setWeight] = useState('')
  const [thick, setThick] = useState('')
  const [curtemp, setCurtemp] = useState('')
  const [tartemp, setTartemp] = useState('')
  const [result, setResult] = useState<{ restCalcValue: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function calculate() {
    try {
      setResult(restCalc(weight, thick, curtemp, tartemp, activeLocale))
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setResult(null)
    }
  }

  function clear() {
    setWeight('')
    setThick('')
    setCurtemp('')
    setTartemp('')
    setResult(null)
    setError(null)
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      {intro && <p>{intro}</p>}
      <NumericField
        label={t(activeLocale, 'calculators.stepMashing.labelWeight')}
        name="weight"
        handleInputChange={(v) => setWeight(v)}
        placeholder={t(activeLocale, 'calculators.stepMashing.placeholderWeight')}
        value={weight}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.stepMashing.labelThick')}
        name="thick"
        handleInputChange={(v) => setThick(v)}
        placeholder={t(activeLocale, 'calculators.stepMashing.placeholderThick')}
        value={thick}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.stepMashing.labelCurTemp')}
        name="curtemp"
        handleInputChange={(v) => setCurtemp(v)}
        placeholder={t(activeLocale, 'calculators.stepMashing.placeholderCurTemp')}
        value={curtemp}
        maxLength={4}
        ariaDescribedby={error ? errorId : undefined}
      />
      <NumericField
        label={t(activeLocale, 'calculators.stepMashing.labelTarTemp')}
        name="tartemp"
        handleInputChange={(v) => setTartemp(v)}
        placeholder={t(activeLocale, 'calculators.stepMashing.placeholderTarTemp')}
        value={tartemp}
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
          {t(activeLocale, 'calculators.stepMashing.result')} <strong>{result.restCalcValue}</strong>
        </p>
      )}
      <Button onClick={calculate} label={t(activeLocale, 'ui.calculate')} />
      <Button onClick={clear} label={t(activeLocale, 'ui.clear')} />
    </div>
  )
}

export default StepMashing
