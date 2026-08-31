import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WaterDilution } from '../../src'

const meta: Meta<typeof WaterDilution> = {
  title: 'Calculators/Dilución',
  component: WaterDilution,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof WaterDilution>

export const Basico: Story = {}
