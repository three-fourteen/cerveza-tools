import { describe, it, expect } from 'vitest'
import {
  hydrometerCorrection,
  alcoholCalc,
  restCalc,
  strikeCalc,
  mashVolCalc,
  dilutionCalc,
  evaporationCalc,
  initialCalc,
  ibuCalc,
  colorCalc,
  carbonationCalc,
  efficiencyCalc,
} from '../src/calculators'

describe('hydrometerCorrection', () => {
  it('corrige la densidad por temperatura', () => {
    const result = hydrometerCorrection('1040', '20', '20')
    expect(result.cHydrometer).toBeDefined()
  })

  it('acepta densidad en formato decimal', () => {
    const result = hydrometerCorrection('1.040', '20', '20')
    expect(result.cHydrometer).toBeDefined()
  })

  it('lanza error si la densidad está vacía', () => {
    expect(() => hydrometerCorrection('', '20', '20')).toThrow(/Lectura densidad/)
  })

  it('lanza error si la temperatura está vacía', () => {
    expect(() => hydrometerCorrection('1040', '', '20')).toThrow(/Temperatura/)
  })

  it('lanza error si el valor no es numérico', () => {
    expect(() => hydrometerCorrection('abc', '20', '20')).toThrow()
  })
})

describe('alcoholCalc', () => {
  it('calcula el alcohol y la atenuación', () => {
    const result = alcoholCalc('1050', '1010')
    expect(result.alcoholCalcValue).toContain('%')
    expect(result.attenuationCalcValue).toContain('%')
  })

  it('lanza error si la densidad inicial está vacía', () => {
    expect(() => alcoholCalc('', '1010')).toThrow(/Densidad inicial/)
  })

  it('lanza error si la densidad final está vacía', () => {
    expect(() => alcoholCalc('1050', '')).toThrow(/Densidad final/)
  })

  it('lanza el error en inglés si se pasa locale "en"', () => {
    expect(() => alcoholCalc('', '1010', 'en')).toThrow(/Initial gravity/)
  })
})

describe('restCalc', () => {
  it('calcula los litros de agua para subir temperatura', () => {
    const result = restCalc('5', '3', '50', '67')
    expect(result.restCalcValue).toBeDefined()
  })

  it('lanza error si el peso está vacío', () => {
    expect(() => restCalc('', '3', '50', '67')).toThrow(/Peso del grano/)
  })
})

describe('strikeCalc', () => {
  it('calcula la temperatura del agua para macerar', () => {
    const result = strikeCalc('3', '67', '18')
    expect(result.strikeCalcValue).toBeDefined()
  })

  it('lanza error si el espesado está vacío', () => {
    expect(() => strikeCalc('', '67', '18')).toThrow(/Litros de agua/)
  })
})

describe('mashVolCalc', () => {
  it('calcula el volumen del macerado', () => {
    const result = mashVolCalc('5', '3')
    expect(result.mashVolCalcValue).toBeDefined()
  })

  it('lanza error si el peso está vacío', () => {
    expect(() => mashVolCalc('', '3')).toThrow(/Peso del grano/)
  })
})

describe('dilutionCalc', () => {
  it('calcula el agua a agregar para diluir', () => {
    const result = dilutionCalc('1052', '1042', '20')
    expect(result.dilutionCalcValue).toBeDefined()
  })

  it('lanza error si la densidad actual está vacía', () => {
    expect(() => dilutionCalc('', '1042', '20')).toThrow(/Densidad actual/)
  })
})

describe('evaporationCalc', () => {
  it('calcula la evaporación y el volumen final', () => {
    const result = evaporationCalc('1040', '30', '60', '1050')
    expect(result.evaporationResult).toBeDefined()
    expect(result.volumeEvaporationResult).toBeDefined()
  })

  it('no tiene el typo volumeEevaporationResult', () => {
    const result = evaporationCalc('1040', '30', '60', '1050')
    expect((result as Record<string, unknown>).volumeEevaporationResult).toBeUndefined()
    expect(result.volumeEvaporationResult).toBeDefined()
  })

  it('lanza error si la densidad inicial está vacía', () => {
    expect(() => evaporationCalc('', '30', '60', '1050')).toThrow(/Densidad inicial/)
  })
})

describe('initialCalc', () => {
  it('calcula la densidad y volumen inicial antes de hervir', () => {
    const result = initialCalc('1060', '25', '60', '6')
    expect(result.densityResult).toBeDefined()
    expect(result.volumeResult).toBeDefined()
  })

  it('lanza error si la densidad después de hervir está vacía', () => {
    expect(() => initialCalc('', '25', '60', '6')).toThrow(/Densidad después de hervir/)
  })

  it('lanza error si la evaporación está vacía', () => {
    expect(() => initialCalc('1060', '25', '60', '')).toThrow(/Perdida de volumen/)
  })
})

describe('ibuCalc', () => {
  it('calcula el amargor en IBU', () => {
    const result = ibuCalc('20', '5', '60', '20', '1050')
    expect(result.ibuCalcValue).toBeDefined()
    expect(Number(result.ibuCalcValue.replace(',', '.'))).toBeGreaterThan(0)
  })

  it('acepta la densidad en formato decimal', () => {
    const result = ibuCalc('20', '5', '60', '20', '1.050')
    expect(result.ibuCalcValue).toBeDefined()
  })

  it('lanza error si el peso del lúpulo está vacío', () => {
    expect(() => ibuCalc('', '5', '60', '20', '1050')).toThrow(/lúpulo/)
  })

  it('lanza el error en inglés si se pasa locale "en"', () => {
    expect(() => ibuCalc('', '5', '60', '20', '1050', 'en')).toThrow(/Hop weight/)
  })
})

describe('colorCalc', () => {
  it('calcula el color en SRM y EBC', () => {
    const result = colorCalc('5', '3.5', '20')
    expect(result.srmCalcValue).toBeDefined()
    expect(result.ebcCalcValue).toBeDefined()
  })

  it('lanza error si el peso del grano está vacío', () => {
    expect(() => colorCalc('', '3.5', '20')).toThrow(/grano/)
  })
})

describe('carbonationCalc', () => {
  it('calcula el azúcar de cebado necesario', () => {
    const result = carbonationCalc('20', '2.4', '0.8')
    expect(result.carbonationCalcValue).toBeDefined()
    expect(Number(result.carbonationCalcValue.replace(',', '.'))).toBeGreaterThan(0)
  })

  it('lanza error si el volumen está vacío', () => {
    expect(() => carbonationCalc('', '2.4', '0.8')).toThrow(/Volumen/)
  })
})

describe('efficiencyCalc', () => {
  it('calcula la eficiencia real del macerado', () => {
    const result = efficiencyCalc('1090', '1045')
    expect(result.efficiencyCalcValue).toContain('%')
  })

  it('lanza error si la densidad potencial está vacía', () => {
    expect(() => efficiencyCalc('', '1045')).toThrow(/potencial/)
  })

  it('lanza error si la densidad real está vacía', () => {
    expect(() => efficiencyCalc('1090', '')).toThrow(/real obtenida/)
  })
})
