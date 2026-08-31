import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Alcohol } from '../../src'

const meta: Meta<typeof Alcohol> = {
  title: 'Calculators/Alcohol',
  component: Alcohol,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Alcohol>

export const Basico: Story = {}

export const ConTituloYDescripcion: Story = {
  name: 'Con título y descripción',
  args: {
    title: 'Contenido en Alcohol / Atenuación',
    intro: 'Descripción sobre la calculadora.',
  },
}
