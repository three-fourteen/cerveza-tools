import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import StepMashing from '../../src/components/calculators/StepMashing'

describe('StepMashing', () => {
  it('muestra los litros de agua a agregar con valores válidos', async () => {
    const user = userEvent.setup()
    render(<StepMashing />)

    await user.type(screen.getByPlaceholderText('ej: 5'), '5')
    await user.type(screen.getByPlaceholderText('ej: 3'), '3')
    await user.type(screen.getByPlaceholderText('ej: 50'), '50')
    await user.type(screen.getByPlaceholderText('ej: 60'), '60')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/litros de agua hirviendo/i)).toBeInTheDocument()
  })

  it('muestra error si el peso del grano está vacío', async () => {
    const user = userEvent.setup()
    render(<StepMashing />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/El valor de \[Peso del grano en Kg\]/)).toBeInTheDocument()
  })

  it('limpiar borra resultado y los cuatro campos', async () => {
    const user = userEvent.setup()
    render(<StepMashing />)

    await user.type(screen.getByPlaceholderText('ej: 5'), '5')
    await user.type(screen.getByPlaceholderText('ej: 3'), '3')
    await user.type(screen.getByPlaceholderText('ej: 50'), '50')
    await user.type(screen.getByPlaceholderText('ej: 60'), '60')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/litros de agua hirviendo/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/litros de agua hirviendo/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('ej: 5')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 3')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 50')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 60')).toHaveValue('')
  })
})
