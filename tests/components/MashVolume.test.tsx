import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import MashVolume from '../../src/components/calculators/MashVolume'

describe('MashVolume', () => {
  it('muestra el volumen del macerado con valores válidos', async () => {
    const user = userEvent.setup()
    render(<MashVolume />)

    await user.type(screen.getByPlaceholderText('ej: 5'), '5')
    await user.type(screen.getByPlaceholderText('ej: 3'), '3')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/macerado ocupara/i)).toBeInTheDocument()
  })

  it('muestra error si el peso del grano está vacío', async () => {
    const user = userEvent.setup()
    render(<MashVolume />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/El valor de \[Peso del grano en Kg\]/)).toBeInTheDocument()
  })

  it('limpiar borra resultado y los dos campos', async () => {
    const user = userEvent.setup()
    render(<MashVolume />)

    await user.type(screen.getByPlaceholderText('ej: 5'), '5')
    await user.type(screen.getByPlaceholderText('ej: 3'), '3')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/macerado ocupara/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/macerado ocupara/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('ej: 5')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 3')).toHaveValue('')
  })
})
