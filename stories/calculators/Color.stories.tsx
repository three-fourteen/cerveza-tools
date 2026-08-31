import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Color } from '../../src'

const meta: Meta<typeof Color> = {
  title: 'Calculators/Color',
  component: Color,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Color>

export const Basico: Story = {}

export const ConTitulo: Story = {
  name: 'Con título',
  args: {
    title: 'Color SRM/EBC',
    intro: 'Calculado con la fórmula de Morey.',
  },
}
