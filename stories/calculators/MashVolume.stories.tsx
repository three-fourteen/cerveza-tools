import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MashVolume } from '../../src'

const meta: Meta<typeof MashVolume> = {
  title: 'Calculators/Volumen Macerado',
  component: MashVolume,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof MashVolume>

export const Basico: Story = {}
