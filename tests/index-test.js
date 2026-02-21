import expect from 'expect'
import {
  hydrometerCorrection,
  alcoholCalc,
  restCalc,
  strikeCalc,
  mashVolCalc,
  dilutionCalc,
  evaporationCalc,
  initialCalc
} from 'src/calculators'

describe('hydrometerCorrection', () => {
  it('corrige la densidad por temperatura', () => {
    const result = hydrometerCorrection('1040', '20', '20')
    expect(result).toExist()
    expect(result.cHydrometer).toExist()
  })

  it('acepta densidad en formato decimal', () => {
    const result = hydrometerCorrection('1.040', '20', '20')
    expect(result).toExist()
  })

  it('lanza error si la densidad esta vacia', () => {
    expect(() => hydrometerCorrection('', '20', '20')).toThrow(/Lectura densidad/)
  })

  it('lanza error si la temperatura esta vacia', () => {
    expect(() => hydrometerCorrection('1040', '', '20')).toThrow(/Temperatura/)
  })

  it('lanza error si el valor no es numerico', () => {
    expect(() => hydrometerCorrection('abc', '20', '20')).toThrow()
  })
})

describe('alcoholCalc', () => {
  it('calcula el alcohol y la atenuacion', () => {
    const result = alcoholCalc('1050', '1010')
    expect(result).toExist()
    expect(result.alcoholCalcValue).toContain('%')
    expect(result.attenuationCalcValue).toContain('%')
  })

  it('lanza error si la densidad inicial esta vacia', () => {
    expect(() => alcoholCalc('', '1010')).toThrow(/Densidad inicial/)
  })

  it('lanza error si la densidad final esta vacia', () => {
    expect(() => alcoholCalc('1050', '')).toThrow(/Densidad final/)
  })
})

describe('restCalc', () => {
  it('calcula los litros de agua para subir temperatura', () => {
    const result = restCalc('5', '3', '50', '67')
    expect(result).toExist()
    expect(result.restCalcValue).toExist()
  })

  it('lanza error si el peso esta vacio', () => {
    expect(() => restCalc('', '3', '50', '67')).toThrow(/Peso del grano/)
  })
})

describe('strikeCalc', () => {
  it('calcula la temperatura del agua para macerar', () => {
    const result = strikeCalc('3', '67', '18')
    expect(result).toExist()
    expect(result.strikeCalcValue).toExist()
  })

  it('lanza error si el espesado esta vacio', () => {
    expect(() => strikeCalc('', '67', '18')).toThrow(/Litros de agua/)
  })
})

describe('mashVolCalc', () => {
  it('calcula el volumen del macerado', () => {
    const result = mashVolCalc('5', '3')
    expect(result).toExist()
    expect(result.mashVolCalcValue).toExist()
  })

  it('lanza error si el peso esta vacio', () => {
    expect(() => mashVolCalc('', '3')).toThrow(/Peso del grano/)
  })
})

describe('dilutionCalc', () => {
  it('calcula el agua a agregar para diluir', () => {
    const result = dilutionCalc('1052', '1042', '20')
    expect(result).toExist()
    expect(result.dilutionCalcValue).toExist()
  })

  it('lanza error si la densidad actual esta vacia', () => {
    expect(() => dilutionCalc('', '1042', '20')).toThrow(/Densidad actual/)
  })
})

describe('evaporationCalc', () => {
  it('calcula la evaporacion y el volumen final', () => {
    const result = evaporationCalc('1040', '30', '60', '1050')
    expect(result).toExist()
    expect(result.evaporationResult).toExist()
    expect(result.volumeEvaporationResult).toExist()
  })

  it('el resultado no tiene el typo volumeEevaporationResult', () => {
    const result = evaporationCalc('1040', '30', '60', '1050')
    expect(result.volumeEevaporationResult).toNotExist()
    expect(result.volumeEvaporationResult).toExist()
  })

  it('lanza error si la densidad inicial esta vacia', () => {
    expect(() => evaporationCalc('', '30', '60', '1050')).toThrow(/Densidad inicial/)
  })
})

describe('initialCalc', () => {
  it('calcula la densidad y volumen inicial antes de hervir', () => {
    const result = initialCalc('6', '25', '60', '1060')
    expect(result).toExist()
    expect(result.densityResult).toExist()
    expect(result.volumeResult).toExist()
  })

  it('lanza error si la evaporacion esta vacia', () => {
    expect(() => initialCalc('', '25', '60', '1060')).toThrow(/Perdida de volumen/)
  })
})
