import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Hydrometer } from '../../src'

const meta: Meta<typeof Hydrometer> = {
  title: 'Calculators/Densimetro',
  component: Hydrometer,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Hydrometer>

export const Basico: Story = {}

export const ConTituloYDescripcion: Story = {
  name: 'Con título y descripción',
  args: {
    title: 'Correción Densimetro',
    intro: 'El valor obtenido es una aproximación, pero bastante exacto para nuestros propositos.',
  },
}
