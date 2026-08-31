import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Color from '../../src/components/calculators/Color'

describe('Color', () => {
  it('muestra resultado con valores válidos', async () => {
    const user = userEvent.setup()
    render(<Color />)

    await user.type(screen.getByPlaceholderText('ej: 5'), '5')
    await user.type(screen.getByPlaceholderText('ej: 3.5'), '3.5')
    await user.type(screen.getByPlaceholderText('ej: 20'), '20')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/Color SRM/)).toBeInTheDocument()
    expect(screen.getByText(/Color EBC/)).toBeInTheDocument()
  })

  it('muestra error si el peso del grano está vacío', async () => {
    const user = userEvent.setup()
    render(<Color />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/grano/)
  })

  it('limpiar borra resultado y campos', async () => {
    const user = userEvent.setup()
    render(<Color />)

    await user.type(screen.getByPlaceholderText('ej: 5'), '5')
    await user.type(screen.getByPlaceholderText('ej: 3.5'), '3.5')
    await user.type(screen.getByPlaceholderText('ej: 20'), '20')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/Color SRM/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/Color SRM/)).not.toBeInTheDocument()
  })

  it('renderiza title e intro cuando se pasan como props', () => {
    render(<Color title="Calculadora Color" intro="Fórmula de Morey" />)

    expect(screen.getByText('Calculadora Color')).toBeInTheDocument()
    expect(screen.getByText('Fórmula de Morey')).toBeInTheDocument()
  })
})
