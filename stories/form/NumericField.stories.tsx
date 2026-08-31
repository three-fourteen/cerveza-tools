import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NumericField } from '../../src'

const meta: Meta<typeof NumericField> = {
  title: 'Form/Input numerico',
  component: NumericField,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    maxLength: { control: 'number' },
    disabled: { control: 'boolean' },
    handleInputChange: { action: 'changed' },
  },
  args: {
    label: 'Test',
    name: 'test',
    placeholder: 'ej: 1040',
  },
}
export default meta

type Story = StoryObj<typeof NumericField>

export const Basico: Story = {}

export const ConLimiteDeDigitos: Story = {
  name: 'Con limite de digitos',
  args: { maxLength: 4 },
}

export const Disabled: Story = {
  args: { disabled: true },
}
