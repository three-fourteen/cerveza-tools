import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Efficiency } from '../../src'

const meta: Meta<typeof Efficiency> = {
  title: 'Calculators/Eficiencia de Macerado',
  component: Efficiency,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Efficiency>

export const Basico: Story = {}

export const ConTitulo: Story = {
  name: 'Con título',
  args: {
    title: 'Eficiencia del macerado',
    intro: 'Compara la densidad potencial del grano con la densidad real obtenida.',
  },
}
