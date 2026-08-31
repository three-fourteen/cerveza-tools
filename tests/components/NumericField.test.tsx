import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import NumericField from '../../src/components/form/NumericField'

describe('NumericField', () => {
  it('llama handleInputChange al escribir', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<NumericField name="test" label="Test" handleInputChange={onChange} value="" />)

    await user.type(screen.getByRole('textbox'), '5')

    expect(onChange).toHaveBeenCalled()
  })

  it('formatea el número con comas al perder el foco', async () => {
    const user = userEvent.setup()
    render(<NumericField name="test" label="Test" value="" />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    fireEvent.input(input, { target: { value: '1050' } })
    await user.tab()

    expect(input).toHaveValue('1,050')
  })

  it('quita el formato al recibir el foco', async () => {
    const user = userEvent.setup()
    render(<NumericField name="test" label="Test" value="1050" />)

    const input = screen.getByRole('textbox')
    // El valor inicial formateado muestra "1,050"
    expect(input).toHaveValue('1,050')

    await user.click(input)
    // Al hacer focus se quita la coma
    expect(input).toHaveValue('1050')
  })

  it('renderiza deshabilitado cuando disabled=true', () => {
    render(<NumericField name="test" label="Test" value="" disabled />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('actualiza el valor cuando la prop value cambia estando sin foco', () => {
    const { rerender } = render(<NumericField name="test" label="Test" value="1050" />)

    expect(screen.getByRole('textbox')).toHaveValue('1,050')

    rerender(<NumericField name="test" label="Test" value="1060" />)

    expect(screen.getByRole('textbox')).toHaveValue('1,060')
  })
})
