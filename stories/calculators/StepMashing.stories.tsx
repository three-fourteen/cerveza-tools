import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StepMashing } from '../../src'

const meta: Meta<typeof StepMashing> = {
  title: 'Calculators/Temperatura Escalonada',
  component: StepMashing,
  argTypes: {
    title: { control: 'text' },
    intro: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof StepMashing>

export const Basico: Story = {}

export const ConTitulo: Story = {
  name: 'Con título',
  args: {
    title: 'Temperatura del agua para realizar escalón en el macerado',
    intro: 'Descripción sobre la calculadora.',
  },
}
