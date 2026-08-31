import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Evaporation from '../../src/components/calculators/Evaporation'

describe('Evaporation', () => {
  it('muestra resultado con los cuatro campos completos', async () => {
    const user = userEvent.setup()
    render(<Evaporation />)

    await user.type(screen.getByPlaceholderText('ej: 1040'), '1040')
    await user.type(screen.getByPlaceholderText('ej: 30'), '30')
    await user.type(screen.getByPlaceholderText('Ej: 60'), '60')
    await user.type(screen.getByPlaceholderText('ej: 1050'), '1050')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/perdida por evaporación/i)).toBeInTheDocument()
    expect(screen.getByText(/volumen después de hervir/i)).toBeInTheDocument()
  })

  it('muestra error si la densidad inicial está vacía', async () => {
    const user = userEvent.setup()
    render(<Evaporation />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/El valor de \[Densidad inicial\]/)).toBeInTheDocument()
  })

  it('limpiar borra resultado y los cuatro campos', async () => {
    const user = userEvent.setup()
    render(<Evaporation />)

    await user.type(screen.getByPlaceholderText('ej: 1040'), '1040')
    await user.type(screen.getByPlaceholderText('ej: 30'), '30')
    await user.type(screen.getByPlaceholderText('Ej: 60'), '60')
    await user.type(screen.getByPlaceholderText('ej: 1050'), '1050')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/perdida por evaporación/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/perdida por evaporación/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('ej: 1040')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 1050')).toHaveValue('')
  })
})
