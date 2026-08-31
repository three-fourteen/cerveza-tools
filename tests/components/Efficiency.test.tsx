import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Efficiency from '../../src/components/calculators/Efficiency'

describe('Efficiency', () => {
  it('muestra resultado con valores válidos', async () => {
    const user = userEvent.setup()
    render(<Efficiency />)

    await user.type(screen.getByPlaceholderText('ej: 1090'), '1090')
    await user.type(screen.getByPlaceholderText('ej: 1045'), '1045')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/Eficiencia del macerado/)).toBeInTheDocument()
  })

  it('muestra error si la densidad potencial está vacía', async () => {
    const user = userEvent.setup()
    render(<Efficiency />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/potencial/)
  })

  it('limpiar borra resultado y campos', async () => {
    const user = userEvent.setup()
    render(<Efficiency />)

    await user.type(screen.getByPlaceholderText('ej: 1090'), '1090')
    await user.type(screen.getByPlaceholderText('ej: 1045'), '1045')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/Eficiencia del macerado/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/Eficiencia del macerado/)).not.toBeInTheDocument()
  })

  it('renderiza title e intro cuando se pasan como props', () => {
    render(<Efficiency title="Calculadora Eficiencia" intro="Real vs. potencial" />)

    expect(screen.getByText('Calculadora Eficiencia')).toBeInTheDocument()
    expect(screen.getByText('Real vs. potencial')).toBeInTheDocument()
  })
})
