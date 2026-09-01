import {
  alcoholCalc,
  carbonationCalc,
  dilutionCalc,
  hydrometerCorrection,
  ibuCalc,
} from '../calculators'
import { parseFloatEx } from '../helpers'
import type { Locale } from '../i18n/translate'
import {
  calculatorNames,
  type BrewingCalculator,
  type BrewingCalculatorToolsRegistration,
  type ModelContext,
  type RegisterBrewingCalculatorToolsOptions,
  type WebMCPTool,
  type WebMCPToolResult,
} from './types'

export { calculatorNames }
export type {
  BrewingCalculator,
  BrewingCalculatorToolsRegistration,
  RegisterBrewingCalculatorToolsOptions,
  WebMCPTool,
}

const toolNames: Record<BrewingCalculator, string> = {
  hydrometer: 'brewing_correct_hydrometer',
  alcohol: 'brewing_calculate_alcohol',
  dilution: 'brewing_calculate_dilution',
  ibu: 'brewing_calculate_ibu',
  carbonation: 'brewing_calculate_carbonation',
}

const controllers = new Map<BrewingCalculator, AbortController>()

function getModelContext(): ModelContext | undefined {
  if (typeof document === 'undefined') return undefined
  return (document as Document & { modelContext?: ModelContext }).modelContext
}

function result(ok: true, data: Record<string, number>): WebMCPToolResult
function result(ok: false, error: { code: string; message: string }): WebMCPToolResult
function result(ok: boolean, value: Record<string, number> | { code: string; message: string }): WebMCPToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(ok ? { ok, data: value } : { ok, error: value }) }] }
}

function errorResult(error: unknown): WebMCPToolResult {
  const knownError = error as Error & { code?: unknown }
  return result(false, {
    code: typeof knownError.code === 'string' ? knownError.code : 'INVALID_INPUT',
    message: knownError instanceof Error ? knownError.message : 'Invalid calculator input.',
  })
}

function objectInput(input: unknown): Record<string, unknown> {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) throw new Error('Tool input must be an object.')
  return input as Record<string, unknown>
}

function numberInput(input: Record<string, unknown>, field: string): number {
  const value = input[field]
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${field} must be a finite number.`)
  }
  return value
}

function localeInput(input: Record<string, unknown>, fallback: Locale): Locale {
  if (input.locale === undefined) return fallback
  if (input.locale === 'en' || input.locale === 'es') return input.locale
  throw new Error('locale must be "en" or "es".')
}

function createTool(
  name: string,
  description: string,
  inputSchema: Record<string, unknown>,
  allowedFields: string[],
  execute: (input: Record<string, unknown>) => Record<string, number>,
): WebMCPTool {
  return {
    name,
    description,
    inputSchema,
    async execute(input) {
      try {
        const object = objectInput(input)
        for (const key of Object.keys(object)) {
          if (!allowedFields.includes(key)) throw new Error(`Unexpected input field: ${key}.`)
        }
        return result(true, execute(object))
      } catch (error) {
        return errorResult(error)
      }
    },
  }
}

const schemas = {
  hydrometer: {
    type: 'object', additionalProperties: false,
    properties: { measuredGravity: { type: 'number' }, measuredTemperatureC: { type: 'number' }, calibrationTemperatureC: { type: 'number' }, locale: { type: 'string', enum: ['es', 'en'] } },
    required: ['measuredGravity', 'measuredTemperatureC', 'calibrationTemperatureC'],
  },
  alcohol: {
    type: 'object', additionalProperties: false,
    properties: { originalGravity: { type: 'number' }, finalGravity: { type: 'number' }, locale: { type: 'string', enum: ['es', 'en'] } },
    required: ['originalGravity', 'finalGravity'],
  },
  dilution: {
    type: 'object', additionalProperties: false,
    properties: { currentVolumeLiters: { type: 'number' }, currentGravity: { type: 'number' }, targetGravity: { type: 'number' }, locale: { type: 'string', enum: ['es', 'en'] } },
    required: ['currentVolumeLiters', 'currentGravity', 'targetGravity'],
  },
  ibu: {
    type: 'object', additionalProperties: false,
    properties: { hopWeightGrams: { type: 'number' }, alphaAcidPercent: { type: 'number' }, boilTimeMinutes: { type: 'number' }, wortVolumeLiters: { type: 'number' }, boilGravity: { type: 'number' }, locale: { type: 'string', enum: ['es', 'en'] } },
    required: ['hopWeightGrams', 'alphaAcidPercent', 'boilTimeMinutes', 'wortVolumeLiters', 'boilGravity'],
  },
  carbonation: {
    type: 'object', additionalProperties: false,
    properties: { volumeLiters: { type: 'number' }, targetCO2Volumes: { type: 'number' }, residualCO2Volumes: { type: 'number' }, locale: { type: 'string', enum: ['es', 'en'] } },
    required: ['volumeLiters', 'targetCO2Volumes', 'residualCO2Volumes'],
  },
} as const

function tools(locale: Locale): Record<BrewingCalculator, WebMCPTool> {
  return {
    hydrometer: createTool(toolNames.hydrometer, 'Correct a hydrometer gravity reading for sample temperature.', schemas.hydrometer, ['measuredGravity', 'measuredTemperatureC', 'calibrationTemperatureC', 'locale'], (input) => {
      const measuredGravity = numberInput(input, 'measuredGravity')
      const measuredTemperatureC = numberInput(input, 'measuredTemperatureC')
      const calibrationTemperatureC = numberInput(input, 'calibrationTemperatureC')
      const correctedGravity = parseFloatEx(hydrometerCorrection(String(measuredGravity), String(measuredTemperatureC), String(calibrationTemperatureC), localeInput(input, locale)).cHydrometer)
      return { measuredGravity, measuredTemperatureC, calibrationTemperatureC, correctedGravity }
    }),
    alcohol: createTool(toolNames.alcohol, 'Calculate alcohol by volume and apparent attenuation from original and final gravity.', schemas.alcohol, ['originalGravity', 'finalGravity', 'locale'], (input) => {
      const originalGravity = numberInput(input, 'originalGravity')
      const finalGravity = numberInput(input, 'finalGravity')
      const calculation = alcoholCalc(String(originalGravity), String(finalGravity), localeInput(input, locale))
      return { originalGravity, finalGravity, abvPercent: parseFloatEx(calculation.alcoholCalcValue), attenuationPercent: parseFloatEx(calculation.attenuationCalcValue) }
    }),
    dilution: createTool(toolNames.dilution, 'Calculate water to add to reduce a wort gravity to a target gravity.', schemas.dilution, ['currentVolumeLiters', 'currentGravity', 'targetGravity', 'locale'], (input) => {
      const currentVolumeLiters = numberInput(input, 'currentVolumeLiters')
      const currentGravity = numberInput(input, 'currentGravity')
      const targetGravity = numberInput(input, 'targetGravity')
      const waterAdditionLiters = Number(dilutionCalc(String(currentGravity), String(targetGravity), String(currentVolumeLiters), localeInput(input, locale)).dilutionCalcValue)
      return { currentVolumeLiters, currentGravity, targetGravity, waterAdditionLiters }
    }),
    ibu: createTool(toolNames.ibu, 'Estimate IBU for one hop addition using the Tinseth formula.', schemas.ibu, ['hopWeightGrams', 'alphaAcidPercent', 'boilTimeMinutes', 'wortVolumeLiters', 'boilGravity', 'locale'], (input) => {
      const hopWeightGrams = numberInput(input, 'hopWeightGrams')
      const alphaAcidPercent = numberInput(input, 'alphaAcidPercent')
      const boilTimeMinutes = numberInput(input, 'boilTimeMinutes')
      const wortVolumeLiters = numberInput(input, 'wortVolumeLiters')
      const boilGravity = numberInput(input, 'boilGravity')
      const ibu = parseFloatEx(ibuCalc(String(hopWeightGrams), String(alphaAcidPercent), String(boilTimeMinutes), String(wortVolumeLiters), String(boilGravity), localeInput(input, locale)).ibuCalcValue)
      return { hopWeightGrams, alphaAcidPercent, boilTimeMinutes, wortVolumeLiters, boilGravity, ibu }
    }),
    carbonation: createTool(toolNames.carbonation, 'Calculate table sugar required to reach a target bottle carbonation level.', schemas.carbonation, ['volumeLiters', 'targetCO2Volumes', 'residualCO2Volumes', 'locale'], (input) => {
      const volumeLiters = numberInput(input, 'volumeLiters')
      const targetCO2Volumes = numberInput(input, 'targetCO2Volumes')
      const residualCO2Volumes = numberInput(input, 'residualCO2Volumes')
      const primingSugarGrams = parseFloatEx(carbonationCalc(String(volumeLiters), String(targetCO2Volumes), String(residualCO2Volumes), localeInput(input, locale)).carbonationCalcValue)
      return { volumeLiters, targetCO2Volumes, residualCO2Volumes, primingSugarGrams }
    }),
  }
}

function selectedCalculators(calculators: RegisterBrewingCalculatorToolsOptions['calculators']): BrewingCalculator[] {
  if (calculators === undefined || calculators === 'all') return [...calculatorNames]
  const selected = [...new Set(calculators)]
  for (const calculator of selected) {
    if (!calculatorNames.includes(calculator)) throw new Error(`Unknown brewing calculator: ${calculator}.`)
  }
  return selected
}

export async function registerBrewingCalculatorTools(
  options: RegisterBrewingCalculatorToolsOptions = {},
): Promise<BrewingCalculatorToolsRegistration> {
  const modelContext = getModelContext()
  if (!modelContext) return { supported: false, registered: [], alreadyRegistered: [], unregister: () => {} }

  const requested = selectedCalculators(options.calculators)
  const availableTools = tools(options.locale ?? 'en')
  const registered: BrewingCalculator[] = []
  const alreadyRegistered: BrewingCalculator[] = []

  for (const calculator of requested) {
    if (controllers.has(calculator)) {
      alreadyRegistered.push(calculator)
      continue
    }
    const controller = new AbortController()
    await modelContext.registerTool(availableTools[calculator], { signal: controller.signal })
    controllers.set(calculator, controller)
    registered.push(calculator)
  }

  return {
    supported: true,
    registered,
    alreadyRegistered,
    unregister: () => unregisterBrewingCalculatorTools(registered),
  }
}

export function unregisterBrewingCalculatorTools(calculators: BrewingCalculator[] | 'all' = 'all'): void {
  const requested = calculators === 'all' ? calculatorNames : calculators
  for (const calculator of requested) {
    const controller = controllers.get(calculator)
    if (!controller) continue
    controller.abort()
    controllers.delete(calculator)
  }
}
