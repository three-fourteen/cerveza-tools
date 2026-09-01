import type { Locale } from '../i18n/translate'

export const calculatorNames = ['hydrometer', 'alcohol', 'dilution', 'ibu', 'carbonation'] as const

export type BrewingCalculator = (typeof calculatorNames)[number]

export interface RegisterBrewingCalculatorToolsOptions {
  calculators?: BrewingCalculator[] | 'all'
  locale?: Locale
}

export interface BrewingCalculatorToolsRegistration {
  supported: boolean
  registered: BrewingCalculator[]
  alreadyRegistered: BrewingCalculator[]
  unregister: () => void
}

export interface WebMCPToolResult {
  content: Array<{ type: 'text'; text: string }>
}

export interface WebMCPTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (input: unknown) => Promise<WebMCPToolResult>
}

export interface ModelContext {
  registerTool: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => void | Promise<void>
}
