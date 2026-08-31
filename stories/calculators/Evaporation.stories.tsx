import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Evaporation } from '../../src'

const meta: Meta<typeof Evaporation> = {
  title: 'Calculators/Evaporacion',
  component: Evaporation,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Evaporation>

export const Basico: Story = {}
