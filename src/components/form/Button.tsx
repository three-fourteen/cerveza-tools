import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  label: string
  type?: 'button' | 'submit' | 'reset'
  style?: string
  onClick?: () => void
  disabled?: boolean
}

function Button({ label, type = 'button', style = 'primary', onClick, disabled = false }: ButtonProps) {
  const cls = [styles.btn, styles[`btn-${style}`]].filter(Boolean).join(' ')
  return (
    <button onClick={onClick} type={type} className={cls} disabled={disabled}>
      {label}
    </button>
  )
}

export default Button
