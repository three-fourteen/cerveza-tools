import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Carbonation from '../../src/components/calculators/Carbonation'

describe('Carbonation', () => {
  it('muestra resultado con valores válidos', async () => {
    const user = userEvent.setup()
    render(<Carbonation />)

    await user.type(screen.getByPlaceholderText('ej: 20'), '20')
    await user.type(screen.getByPlaceholderText('ej: 2.4'), '2.4')
    await user.type(screen.getByPlaceholderText('ej: 0.8'), '0.8')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/Azúcar de cebado/)).toBeInTheDocument()
  })

  it('muestra error si el volumen está vacío', async () => {
    const user = userEvent.setup()
    render(<Carbonation />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/Volumen/)
  })

  it('limpiar borra resultado y campos', async () => {
    const user = userEvent.setup()
    render(<Carbonation />)

    await user.type(screen.getByPlaceholderText('ej: 20'), '20')
    await user.type(screen.getByPlaceholderText('ej: 2.4'), '2.4')
    await user.type(screen.getByPlaceholderText('ej: 0.8'), '0.8')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/Azúcar de cebado/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/Azúcar de cebado/)).not.toBeInTheDocument()
  })

  it('renderiza title e intro cuando se pasan como props', () => {
    render(<Carbonation title="Calculadora Carbonatación" intro="Azúcar de cebado" />)

    expect(screen.getByText('Calculadora Carbonatación')).toBeInTheDocument()
    expect(screen.getByText('Azúcar de cebado')).toBeInTheDocument()
  })
})
