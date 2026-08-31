import { checkVal, parseFloatEx, round } from '../helpers'

// Convierte densidad en formato 1040 o 1.040 a puntos de gravedad (ej: 40)
function densityToPoints(density: number): number {
  let d: number | string = density
  if (d.toString().indexOf('.') !== -1) {
    d = parseFloat(d.toFixed(3).replace('.', ''))
  }
  return parseFloat(d.toString()) - 1000
}

// Correcion densimetro
export function hydrometerCorrection(hydrometer: string, temp: string, cTemp: string) {
  checkVal(hydrometer, 'Lectura densidad')
  checkVal(temp, 'Temperatura')
  checkVal(cTemp, 'Temperatura ajuste densimetro')

  let hydrometerParsed = parseFloatEx(hydrometer)
  if (hydrometerParsed.toString().indexOf('.') === -1) hydrometerParsed = hydrometerParsed / 1000
  const tempParsed = parseFloatEx(temp)
  const cTempParsed = parseFloatEx(cTemp)

  const value = round(
    hydrometerParsed + (calculateTempCorrection(cTempParsed) / calculateTempCorrection(tempParsed) - 1),
    3,
  )
  return { cHydrometer: value }
}

function calculateTempCorrection(temp: number): number {
  return 1 - ((temp + 288.9414) / (508929.2 * (temp + 68.12963))) * Math.pow(temp - 3.9863, 2)
}

// Calcular alcohol y atenuacion
export function alcoholCalc(DO: string, DF: string) {
  checkVal(DO, 'Densidad inicial')
  checkVal(DF, 'Densidad final')

  const pointsDO = densityToPoints(parseFloatEx(DO))
  const pointsDF = densityToPoints(parseFloatEx(DF))

  const alcohol = (pointsDO - pointsDF) / 7.45
  const attenuation = ((pointsDO - pointsDF) / pointsDO) * 100

  return {
    alcoholCalcValue: `${round(alcohol, 2)} %`,
    attenuationCalcValue: `${round(attenuation, 2)} %`,
  }
}

// Temperatura escalonada
export function restCalc(weight: string, thick: string, curtemp: string, tartemp: string) {
  checkVal(weight, 'Peso del grano en Kg')
  checkVal(thick, 'Litros de agua por Kg de grano')
  checkVal(curtemp, 'Temperatura actual')
  checkVal(tartemp, 'Temperatura objetivo')

  const w = parseFloatEx(weight)
  const t = parseFloatEx(thick)
  const cur = parseFloatEx(curtemp)
  const tar = parseFloatEx(tartemp)
  const strikeTemp = (w * (0.4 + t) * (tar - cur)) / (100 - tar)

  return { restCalcValue: round(strikeTemp, 1) }
}

// Temperatura macerado
export function strikeCalc(thick: string, strtemp: string, grntemp: string) {
  checkVal(thick, 'Litros de agua por Kg de grano')
  checkVal(strtemp, 'Temperatura objetivo del macerado')
  checkVal(grntemp, 'Temperatura del grano')

  const t = parseFloatEx(thick)
  const str = parseFloatEx(strtemp)
  const grn = parseFloatEx(grntemp)
  const strikeTemp = str + (0.4 * (str - grn)) / t + 1.7

  return { strikeCalcValue: round(strikeTemp, 1) }
}

// Volumen de macerado
export function mashVolCalc(weight: string, thick: string) {
  checkVal(weight, 'Peso del grano en Kg')
  checkVal(thick, 'Litros de agua por Kg de grano')

  const w = parseFloatEx(weight)
  const t = parseFloatEx(thick)
  const vol = w * (0.67 + t)

  return { mashVolCalcValue: round(vol, 2) }
}

export function dilutionCalc(DO: string, DF: string, volume: string) {
  checkVal(DO, 'Densidad actual')
  checkVal(DF, 'Densidad objetivo')
  checkVal(volume, 'Volumen en litros')

  const pointsDO = densityToPoints(parseFloatEx(DO))
  const pointsDF = densityToPoints(parseFloatEx(DF))
  const vol = parseFloatEx(volume)
  const water = (pointsDO * vol) / pointsDF - vol

  return { dilutionCalcValue: parseFloat(water.toString()).toFixed(3) }
}

export function evaporationCalc(densityBefore: string, volume: string, timeValue: string, densityAfter: string) {
  checkVal(densityBefore, 'Densidad inicial')
  checkVal(volume, 'Volumen inicial')
  checkVal(timeValue, 'Tiempo hervido')
  checkVal(densityAfter, 'Densidad final')

  const pointsBefore = densityToPoints(parseFloatEx(densityBefore))
  const pointsAfter = densityToPoints(parseFloatEx(densityAfter))
  const vol = parseFloatEx(volume)
  const time = parseFloatEx(timeValue)

  const endVolume = (pointsBefore * vol) / pointsAfter
  const lostVolume = vol - endVolume
  const lostHour = (lostVolume / time) * 60

  return { evaporationResult: round(lostHour, 2), volumeEvaporationResult: round(endVolume, 1) }
}

export function initialCalc(densityAfter: string, volume: string, timeValue: string, evaporation: string) {
  checkVal(densityAfter, 'Densidad después de hervir')
  checkVal(volume, 'Volumen después de hervir')
  checkVal(timeValue, 'Tiempo hervido')
  checkVal(evaporation, 'Perdida de volumen en l/h')

  const pointsAfter = densityToPoints(parseFloatEx(densityAfter))
  const vol = parseFloatEx(volume)
  const time = parseFloatEx(timeValue)
  const evap = parseFloatEx(evaporation)

  const initialVolume = vol + (evap * time) / 60
  const initialDensity = (vol * pointsAfter) / initialVolume

  return {
    densityResult: parseFloat((1000 + initialDensity).toString()).toFixed(0),
    volumeResult: round(initialVolume, 2),
  }
}
