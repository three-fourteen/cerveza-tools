import React from 'react'
import styles from './InputField.module.css'

interface InputFieldProps {
  label: string
  name: string
  placeholder?: string
  type?: string
  value: string
  handleChange: React.FormEventHandler<HTMLInputElement>
  handleBlur: React.FocusEventHandler<HTMLInputElement>
  handleFocus: React.FocusEventHandler<HTMLInputElement>
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>
  hideLabel?: boolean
  disabled?: boolean
  ariaDescribedby?: string
}

function InputField({
  label,
  name,
  placeholder,
  type = 'text',
  value,
  handleChange,
  handleBlur,
  handleFocus,
  handleKeyDown,
  hideLabel,
  disabled,
  ariaDescribedby,
}: InputFieldProps) {
  const labelClass = hideLabel ? `${styles['sr-only']} ` : ''
  return (
    <div className={styles['form-group']}>
      <label className={labelClass + styles['form-label']} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles['input-field']}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onInput={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        readOnly={!handleChange}
        aria-describedby={ariaDescribedby}
      />
    </div>
  )
}

export default InputField
