import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Ibu from '../../src/components/calculators/Ibu'

describe('Ibu', () => {
  it('muestra resultado con valores válidos', async () => {
    const user = userEvent.setup()
    render(<Ibu />)

    await user.type(screen.getByLabelText(/Peso del lúpulo/), '20')
    await user.type(screen.getByLabelText(/Ácido alfa/), '5')
    await user.type(screen.getByLabelText(/Tiempo de hervido/), '60')
    await user.type(screen.getByLabelText(/Volumen del mosto/), '20')
    await user.type(screen.getByLabelText(/Densidad durante el hervido/), '1050')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/IBU/)).toBeInTheDocument()
  })

  it('muestra error si el peso del lúpulo está vacío', async () => {
    const user = userEvent.setup()
    render(<Ibu />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/lúpulo/)
  })

  it('limpiar borra resultado y campos', async () => {
    const user = userEvent.setup()
    render(<Ibu />)

    await user.type(screen.getByLabelText(/Peso del lúpulo/), '20')
    await user.type(screen.getByLabelText(/Ácido alfa/), '5')
    await user.type(screen.getByLabelText(/Tiempo de hervido/), '60')
    await user.type(screen.getByLabelText(/Volumen del mosto/), '20')
    await user.type(screen.getByLabelText(/Densidad durante el hervido/), '1050')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/IBU/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/IBU/)).not.toBeInTheDocument()
  })

  it('renderiza title e intro cuando se pasan como props', () => {
    render(<Ibu title="Calculadora IBU" intro="Fórmula de Tinseth" />)

    expect(screen.getByText('Calculadora IBU')).toBeInTheDocument()
    expect(screen.getByText('Fórmula de Tinseth')).toBeInTheDocument()
  })
})
