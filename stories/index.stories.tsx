import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  NumericField,
  Button,
  Hydrometer,
  Alcohol,
  StepMashing,
  MashTemperature,
  MashVolume,
  WaterDilution,
  Evaporation,
  InitialDensity,
} from '../src'

// ─── Densímetro ──────────────────────────────────────────────────────────────

const hydroMeta: Meta<typeof Hydrometer> = {
  title: 'Calculators/Densimetro',
  component: Hydrometer,
}
export default hydroMeta

export const HydrometerBasico: StoryObj<typeof Hydrometer> = { name: 'Basico' }
export const HydrometerConTitulo: StoryObj<typeof Hydrometer> = {
  name: 'Con título y descripción',
  args: {
    title: 'Correción Densimetro',
    intro: 'El valor obtenido es una aproximación, pero bastante exacto para nuestros propositos.',
  },
}

// ─── Alcohol ──────────────────────────────────────────────────────────────────

export const AlcoholBasico: StoryObj<typeof Alcohol> = {
  render: () => <Alcohol />,
  name: 'Alcohol/Basico',
}
export const AlcoholConTitulo: StoryObj<typeof Alcohol> = {
  render: () => <Alcohol title="Contenido en Alcohol / Atenuación" intro="Descripción sobre la calculadora." />,
  name: 'Alcohol/Con título y descripción',
}

// ─── Temperatura escalonada ───────────────────────────────────────────────────

export const StepMashingBasico: StoryObj<typeof StepMashing> = {
  render: () => <StepMashing />,
  name: 'Temperatura Escalonada/Basico',
}
export const StepMashingConTitulo: StoryObj<typeof StepMashing> = {
  render: () => (
    <StepMashing title="Temperatura del agua para realizar escalón en el macerado" intro="Descripción sobre la calculadora." />
  ),
  name: 'Temperatura Escalonada/Con título',
}

// ─── Temperatura macerado ─────────────────────────────────────────────────────

export const MashTemperatureBasico: StoryObj<typeof MashTemperature> = {
  render: () => <MashTemperature />,
  name: 'Temperatura Macerado/Basico',
}

// ─── Volumen macerado ─────────────────────────────────────────────────────────

export const MashVolumeBasico: StoryObj<typeof MashVolume> = {
  render: () => <MashVolume />,
  name: 'Volumen Macerado/Basico',
}

// ─── Dilución ─────────────────────────────────────────────────────────────────

export const WaterDilutionBasico: StoryObj<typeof WaterDilution> = {
  render: () => <WaterDilution />,
  name: 'Dilución/Basico',
}

// ─── Evaporación ──────────────────────────────────────────────────────────────

export const EvaporationBasico: StoryObj<typeof Evaporation> = {
  render: () => <Evaporation />,
  name: 'Evaporacion/Basico',
}

// ─── Densidad Inicial ─────────────────────────────────────────────────────────

export const InitialDensityBasico: StoryObj<typeof InitialDensity> = {
  render: () => <InitialDensity />,
  name: 'Densidad Inicial/Basico',
}

// ─── Form elements ───────────────────────────────────────────────────────────

export const NumericFieldBasico: StoryObj<typeof NumericField> = {
  render: () => <NumericField label="Test" name="test" handleInputChange={() => {}} placeholder="ej: 1040" />,
  name: 'Form/Input numerico/Basico',
}
export const NumericFieldConLimite: StoryObj<typeof NumericField> = {
  render: () => <NumericField label="Test" name="test" handleInputChange={() => {}} placeholder="ej: 1040" maxLength={4} />,
  name: 'Form/Input numerico/Con limite de digitos',
}
export const NumericFieldDisabled: StoryObj<typeof NumericField> = {
  render: () => <NumericField label="Test" name="test" handleInputChange={() => {}} placeholder="ej: 1040" disabled />,
  name: 'Form/Input numerico/Disabled',
}

export const ButtonBasico: StoryObj<typeof Button> = {
  render: () => <Button onClick={() => {}} label="Test label" />,
  name: 'Buttons/Basico',
}
export const ButtonDisabled: StoryObj<typeof Button> = {
  render: () => <Button onClick={() => {}} label="Test label" disabled />,
  name: 'Buttons/Disabled',
}
