import React from 'react'
import './button.css'

interface ButtonProps {
  label: string
  type?: 'button' | 'submit' | 'reset'
  style?: string
  onClick?: () => void
  disabled?: boolean
}

function Button({ label, type = 'button', style = 'primary', onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} type={type} className={`btn btn-${style}`} disabled={disabled}>
      {label}
    </button>
  )
}

export default Button
