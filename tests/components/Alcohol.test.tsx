import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Alcohol from '../../src/components/calculators/Alcohol'
import { LocaleProvider } from '../../src/i18n'

describe('Alcohol', () => {
  it('muestra resultado con valores válidos', async () => {
    const user = userEvent.setup()
    render(<Alcohol />)

    await user.type(screen.getByPlaceholderText('ej: 1045'), '1050')
    await user.type(screen.getByPlaceholderText('ej: 1012'), '1010')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByText(/Volumen de alcohol/)).toBeInTheDocument()
    expect(screen.getByText(/Atenuación/)).toBeInTheDocument()
  })

  it('muestra error si densidad inicial está vacía', async () => {
    const user = userEvent.setup()
    render(<Alcohol />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(/Densidad inicial/)
  })

  it('muestra error si solo falta densidad final', async () => {
    const user = userEvent.setup()
    render(<Alcohol />)

    await user.type(screen.getByPlaceholderText('ej: 1045'), '1050')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/Densidad final/)
  })

  it('limpiar borra resultado y campos', async () => {
    const user = userEvent.setup()
    render(<Alcohol />)

    await user.type(screen.getByPlaceholderText('ej: 1045'), '1050')
    await user.type(screen.getByPlaceholderText('ej: 1012'), '1010')
    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByText(/Volumen de alcohol/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByText(/Volumen de alcohol/)).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('ej: 1045')).toHaveValue('')
    expect(screen.getByPlaceholderText('ej: 1012')).toHaveValue('')
  })

  it('limpiar borra también el mensaje de error', async () => {
    const user = userEvent.setup()
    render(<Alcohol />)

    await user.click(screen.getByRole('button', { name: 'Calcular' }))
    expect(screen.getByRole('alert')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar' }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('renderiza title e intro cuando se pasan como props', () => {
    render(<Alcohol title="Calculadora Alcohol" intro="Calcula el ABV" />)

    expect(screen.getByText('Calculadora Alcohol')).toBeInTheDocument()
    expect(screen.getByText('Calcula el ABV')).toBeInTheDocument()
  })

  it('no renderiza h3 ni párrafo de intro si no se pasan props', () => {
    render(<Alcohol />)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('usa inglés cuando se pasa locale="en"', async () => {
    const user = userEvent.setup()
    render(<Alcohol locale="en" />)

    expect(screen.getByText('Initial gravity')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Calculate' }))

    expect(screen.getByRole('alert')).toHaveTextContent(/Initial gravity/)
  })

  it('usa el locale del LocaleProvider si no se pasa la prop', () => {
    render(
      <LocaleProvider locale="en">
        <Alcohol />
      </LocaleProvider>,
    )

    expect(screen.getByText('Initial gravity')).toBeInTheDocument()
  })

  it('la prop locale tiene prioridad sobre el LocaleProvider', () => {
    render(
      <LocaleProvider locale="en">
        <Alcohol locale="es" />
      </LocaleProvider>,
    )

    expect(screen.getByText('Densidad inicial')).toBeInTheDocument()
  })
})
