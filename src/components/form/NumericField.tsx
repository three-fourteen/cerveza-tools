import React, { useState, useEffect, useRef } from 'react'
import InputField from './InputField'
import { numberWithCommas, numberWithoutCommas } from '../../helpers'

interface NumericFieldProps {
  name: string
  label: string
  placeholder?: string
  value?: string | number
  maxLength?: number
  disabled?: boolean
  handleInputChange?: (value: string, name: string) => void
}

function formatValue(value: string | number | undefined): string {
  if (!value && value !== 0) return ''
  const num = Number(value)
  const formatted = Number.isInteger(num) ? num : parseFloat(num.toFixed(2))
  return numberWithCommas(formatted)
}

function NumericField({
  name,
  label,
  placeholder,
  value,
  maxLength = Infinity,
  disabled,
  handleInputChange,
}: NumericFieldProps) {
  const [inputValue, setInputValue] = useState(() => formatValue(value))
  const focusRef = useRef(false)

  useEffect(() => {
    if (!focusRef.current) {
      setInputValue(value === '' ? '' : formatValue(value))
    }
  }, [value])

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const charCode = e.which
    const val = e.currentTarget.value + ''

    if (val.indexOf('.') >= 0 && charCode === 190) {
      e.preventDefault()
      return
    }

    if ([8, 9, 46, 37, 38, 39, 40, 190].includes(charCode)) return

    const isMainDigit = charCode >= 48 && charCode <= 57
    const isNumpadDigit = charCode >= 96 && charCode <= 105
    if (charCode > 31 && !isMainDigit && !isNumpadDigit) {
      e.preventDefault()
      return
    }

    if (
      val.length > maxLength ||
      (val.length === maxLength && val.indexOf('.') >= 0 && charCode !== 190) ||
      (val.length === maxLength && val.indexOf('.') === -1 && charCode !== 190)
    ) {
      e.preventDefault()
    }
  }

  const handleChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.currentTarget.value
    setInputValue(newValue)
    handleInputChange?.(newValue, e.currentTarget.name)
  }

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    focusRef.current = false
    let newValue = e.currentTarget.value.replace(/^0+/, '')
    if (newValue !== '') newValue = numberWithCommas(newValue)
    setInputValue(newValue)
  }

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    focusRef.current = true
    setInputValue(numberWithoutCommas(e.currentTarget.value))
  }

  return (
    <InputField
      label={label}
      name={name}
      placeholder={placeholder}
      value={inputValue}
      disabled={disabled}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleFocus={handleFocus}
      handleKeyDown={handleKeyDown}
    />
  )
}

export default NumericField
