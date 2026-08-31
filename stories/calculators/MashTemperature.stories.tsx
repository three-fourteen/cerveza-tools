import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MashTemperature } from '../../src'

const meta: Meta<typeof MashTemperature> = {
  title: 'Calculators/Temperatura Macerado',
  component: MashTemperature,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof MashTemperature>

export const Basico: Story = {}
