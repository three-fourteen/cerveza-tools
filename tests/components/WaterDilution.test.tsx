import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import WaterDilution from '../../src/components/calculators/WaterDilution'

describe('WaterDilution', () => {
  it('muestra el agua a añadir con valores válidos', async () => {
    const user = userEvent.setup()
    render(<WaterDilution />)

    await user.type(screen.getByPlaceholderText('ej: 1052'), '1052')
    await user.type(screen.getByPlaceholderText('ej: 20'), '20')
    await user.type(screen.getByPlaceholderText('ej: 1042'), '1042')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/Añadir agua/i)).toBeInTheDocument()
  })

  it('muestra error si la densidad actual está vacía', async () => {
    const user = userEvent.setup()
    render(<WaterDilution />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/Densidad actual/)
  })

  it('limpiar borra resultado y los tres campos', async () => {
    const user = userEvent.setup()
    render(<WaterDilution />)

    await user.type(screen.getByPlaceholderText('ej: 1052'), '1052')
    await user.type(screen.getByPlaceholderText('ej: 20'), '20')
    await user.type(screen.getByPlaceholderText('ej: 1042'), '1042')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/Añadir agua/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/Añadir agua/i)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('ej: 1052')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 20')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 1042')).toHaveValue('')
  })
})
