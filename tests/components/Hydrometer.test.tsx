import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Hydrometer from '../../src/components/calculators/Hydrometer'

describe('Hydrometer', () => {
  it('muestra la densidad corregida con valores válidos', async () => {
    const user = userEvent.setup()
    render(<Hydrometer />)

    await user.type(screen.getByPlaceholderText('ej: 1040'), '1040')
    await user.type(screen.getByPlaceholderText('ej: 67'), '20')
    await user.type(screen.getByPlaceholderText('Ej: 20'), '20')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/densidad corregida/i)).toBeInTheDocument()
  })

  it('muestra error si densidad está vacía', async () => {
    const user = userEvent.setup()
    render(<Hydrometer />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/Lectura densidad/i)
  })

  it('limpiar borra resultado y los tres campos', async () => {
    const user = userEvent.setup()
    render(<Hydrometer />)

    await user.type(screen.getByPlaceholderText('ej: 1040'), '1040')
    await user.type(screen.getByPlaceholderText('ej: 67'), '20')
    await user.type(screen.getByPlaceholderText('Ej: 20'), '20')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/densidad corregida/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/densidad corregida/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('ej: 1040')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 67')).toHaveValue('')
    expect(screen.getByPlaceholderText('Ej: 20')).toHaveValue('')
  })
})
