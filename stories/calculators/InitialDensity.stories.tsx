import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { InitialDensity } from '../../src'

const meta: Meta<typeof InitialDensity> = {
  title: 'Calculators/Densidad Inicial',
  component: InitialDensity,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof InitialDensity>

export const Basico: Story = {}
