import { afterEach, describe, expect, it } from 'vitest'
import {
  registerBrewingCalculatorTools,
  unregisterBrewingCalculatorTools,
  type WebMCPTool,
} from '../src/webmcp'

type TestDocument = Document & { modelContext?: { registerTool: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => void | Promise<void> } }

const testDocument = document as TestDocument

afterEach(() => {
  unregisterBrewingCalculatorTools()
  delete testDocument.modelContext
})

function response(tool: WebMCPTool, input: unknown) {
  return tool.execute(input).then((value) => JSON.parse(value.content[0].text))
}

describe('WebMCP calculator tools', () => {
  it('returns unsupported without touching ordinary browser usage', async () => {
    const registration = await registerBrewingCalculatorTools()

    expect(registration).toMatchObject({ supported: false, registered: [], alreadyRegistered: [] })
  })

  it('registers a selected tool and maps hydrometer input to the pure calculator', async () => {
    const registered: WebMCPTool[] = []
    testDocument.modelContext = { registerTool: (tool) => registered.push(tool) }

    const registration = await registerBrewingCalculatorTools({ calculators: ['hydrometer'] })
    const result = await response(registered[0], {
      measuredGravity: 1.056,
      measuredTemperatureC: 28,
      calibrationTemperatureC: 20,
    })

    expect(registration).toMatchObject({ supported: true, registered: ['hydrometer'], alreadyRegistered: [] })
    expect(registered[0].name).toBe('brewing_correct_hydrometer')
    expect(result).toMatchObject({ ok: true, data: { measuredGravity: 1.056, correctedGravity: expect.any(Number) } })
  })

  it('registers all five tools and does not duplicate an existing registration', async () => {
    const registered: WebMCPTool[] = []
    testDocument.modelContext = { registerTool: (tool) => registered.push(tool) }

    await registerBrewingCalculatorTools({ calculators: 'all' })
    const duplicate = await registerBrewingCalculatorTools({ calculators: ['alcohol', 'ibu'] })

    expect(registered).toHaveLength(5)
    expect(duplicate).toMatchObject({ registered: [], alreadyRegistered: ['alcohol', 'ibu'] })
  })

  it('rejects an unknown calculator name from an untyped caller', async () => {
    testDocument.modelContext = { registerTool: () => {} }

    await expect(registerBrewingCalculatorTools({ calculators: ['unknown'] as never[] })).rejects.toThrow('Unknown brewing calculator: unknown.')
  })

  it('aborts registrations when the returned disposer is invoked', async () => {
    let signal: AbortSignal | undefined
    testDocument.modelContext = { registerTool: (_tool, options) => { signal = options?.signal } }

    const registration = await registerBrewingCalculatorTools({ calculators: ['alcohol'] })
    registration.unregister()

    expect(signal?.aborted).toBe(true)
    expect((await registerBrewingCalculatorTools({ calculators: ['alcohol'] })).registered).toEqual(['alcohol'])
  })

  it('returns structured success responses for each remaining calculator', async () => {
    const registered = new Map<string, WebMCPTool>()
    testDocument.modelContext = { registerTool: (tool) => registered.set(tool.name, tool) }
    await registerBrewingCalculatorTools({ calculators: ['alcohol', 'dilution', 'ibu', 'carbonation'], locale: 'en' })

    await expect(response(registered.get('brewing_calculate_alcohol')!, { originalGravity: 1.058, finalGravity: 1.012 })).resolves.toMatchObject({ ok: true, data: { abvPercent: expect.any(Number), attenuationPercent: expect.any(Number) } })
    await expect(response(registered.get('brewing_calculate_dilution')!, { currentVolumeLiters: 20, currentGravity: 1.058, targetGravity: 1.05 })).resolves.toMatchObject({ ok: true, data: { waterAdditionLiters: expect.any(Number) } })
    await expect(response(registered.get('brewing_calculate_ibu')!, { hopWeightGrams: 20, alphaAcidPercent: 5, boilTimeMinutes: 60, wortVolumeLiters: 20, boilGravity: 1.05 })).resolves.toMatchObject({ ok: true, data: { ibu: expect.any(Number) } })
    await expect(response(registered.get('brewing_calculate_carbonation')!, { volumeLiters: 20, targetCO2Volumes: 2.4, residualCO2Volumes: 0.8 })).resolves.toMatchObject({ ok: true, data: { primingSugarGrams: expect.any(Number) } })
  })

  it('returns localized structured errors for malformed and semantically invalid inputs', async () => {
    const registered: WebMCPTool[] = []
    testDocument.modelContext = { registerTool: (tool) => registered.push(tool) }
    await registerBrewingCalculatorTools({ calculators: ['alcohol'], locale: 'en' })

    await expect(response(registered[0], { originalGravity: '1.058', finalGravity: 1.012 })).resolves.toMatchObject({ ok: false, error: { code: 'INVALID_INPUT', message: 'originalGravity must be a finite number.' } })
    await expect(response(registered[0], { originalGravity: 1.012, finalGravity: 1.058 })).resolves.toMatchObject({ ok: false, error: { code: 'INVALID_GRAVITY', message: 'Original gravity must be greater than final gravity.' } })
  })
})
