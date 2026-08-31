import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../src'

const meta: Meta<typeof Button> = {
  title: 'Form/Buttons',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    style: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'link'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    label: 'Test label',
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Basico: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}
