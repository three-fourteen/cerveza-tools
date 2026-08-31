import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import InitialDensity from '../../src/components/calculators/InitialDensity'

describe('InitialDensity', () => {
  it('muestra resultado con los cuatro campos completos', async () => {
    const user = userEvent.setup()
    render(<InitialDensity />)

    await user.type(screen.getByPlaceholderText('ej: 1060'), '1060')
    await user.type(screen.getByPlaceholderText('ej: 30'), '25')
    await user.type(screen.getByPlaceholderText('Ej: 60'), '60')
    await user.type(screen.getByPlaceholderText('Ej: 6'), '6')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/La densidad antes de hervir deberá/i)).toBeInTheDocument()
  })

  it('muestra error si la perdida de volumen está vacía', async () => {
    const user = userEvent.setup()
    render(<InitialDensity />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/Densidad después de hervir/)
  })

  it('limpiar borra resultado y los cuatro campos', async () => {
    const user = userEvent.setup()
    render(<InitialDensity />)

    await user.type(screen.getByPlaceholderText('ej: 1060'), '1060')
    await user.type(screen.getByPlaceholderText('ej: 30'), '25')
    await user.type(screen.getByPlaceholderText('Ej: 60'), '60')
    await user.type(screen.getByPlaceholderText('Ej: 6'), '6')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/La densidad antes de hervir deberá/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/La densidad antes de hervir deberá/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('ej: 1060')).toHaveValue('')
    expect(screen.getByPlaceholderText('Ej: 6')).toHaveValue('')
  })
})
