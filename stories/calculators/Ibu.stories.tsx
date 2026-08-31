import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Ibu } from '../../src'

const meta: Meta<typeof Ibu> = {
  title: 'Calculators/IBU',
  component: Ibu,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Ibu>

export const Basico: Story = {}

export const ConTitulo: Story = {
  name: 'Con título',
  args: {
    title: 'Amargor (IBU)',
    intro: 'Calculado con la fórmula de Tinseth.',
  },
}
