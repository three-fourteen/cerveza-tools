import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Carbonation } from '../../src'

const meta: Meta<typeof Carbonation> = {
  title: 'Calculators/Carbonatación',
  component: Carbonation,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Carbonation>

export const Basico: Story = {}

export const ConTitulo: Story = {
  name: 'Con título',
  args: {
    title: 'Carbonatación en botella',
    intro: 'Azúcar de cebado necesaria según el volumen de CO2 objetivo.',
  },
}
