import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import MashTemperature from '../../src/components/calculators/MashTemperature'

describe('MashTemperature', () => {
  it('muestra la temperatura del agua necesaria con valores válidos', async () => {
    const user = userEvent.setup()
    render(<MashTemperature />)

    await user.type(screen.getByPlaceholderText('ej: 3'), '3')
    await user.type(screen.getByPlaceholderText('ej: 67'), '67')
    await user.type(screen.getByPlaceholderText('ej: 18'), '18')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/temperatura del agua/i)).toBeInTheDocument()
  })

  it('muestra error si litros de agua por kg está vacío', async () => {
    const user = userEvent.setup()
    render(<MashTemperature />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/El valor de \[Litros de agua por Kg de grano\]/)).toBeInTheDocument()
  })

  it('limpiar borra resultado y los tres campos', async () => {
    const user = userEvent.setup()
    render(<MashTemperature />)

    await user.type(screen.getByPlaceholderText('ej: 3'), '3')
    await user.type(screen.getByPlaceholderText('ej: 67'), '67')
    await user.type(screen.getByPlaceholderText('ej: 18'), '18')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/temperatura del agua/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/temperatura del agua/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('ej: 3')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 67')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 18')).toHaveValue('')
  })
})
