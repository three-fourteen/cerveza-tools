import { checkVal, parseFloatEx, round } from '../helpers'
import type { Locale } from '../i18n'

// Convierte densidad en formato 1040 o 1.040 a puntos de gravedad (ej: 40)
function densityToPoints(density: number): number {
  let d: number | string = density
  if (d.toString().indexOf('.') !== -1) {
    d = parseFloat(d.toFixed(3).replace('.', ''))
  }
  return parseFloat(d.toString()) - 1000
}

// Correcion densimetro
export function hydrometerCorrection(hydrometer: string, temp: string, cTemp: string, locale: Locale = 'es') {
  checkVal(hydrometer, 'hydrometerReading', locale)
  checkVal(temp, 'temperature', locale)
  checkVal(cTemp, 'hydrometerAdjustTemp', locale)

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
export function alcoholCalc(DO: string, DF: string, locale: Locale = 'es') {
  checkVal(DO, 'initialDensity', locale)
  checkVal(DF, 'finalDensity', locale)

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
export function restCalc(weight: string, thick: string, curtemp: string, tartemp: string, locale: Locale = 'es') {
  checkVal(weight, 'grainWeight', locale)
  checkVal(thick, 'waterPerKgGrain', locale)
  checkVal(curtemp, 'currentTemp', locale)
  checkVal(tartemp, 'targetTemp', locale)

  const w = parseFloatEx(weight)
  const t = parseFloatEx(thick)
  const cur = parseFloatEx(curtemp)
  const tar = parseFloatEx(tartemp)
  const strikeTemp = (w * (0.4 + t) * (tar - cur)) / (100 - tar)

  return { restCalcValue: round(strikeTemp, 1) }
}

// Temperatura macerado
export function strikeCalc(thick: string, strtemp: string, grntemp: string, locale: Locale = 'es') {
  checkVal(thick, 'waterPerKgGrain', locale)
  checkVal(strtemp, 'targetMashTemp', locale)
  checkVal(grntemp, 'grainTemp', locale)

  const t = parseFloatEx(thick)
  const str = parseFloatEx(strtemp)
  const grn = parseFloatEx(grntemp)
  const strikeTemp = str + (0.4 * (str - grn)) / t + 1.7

  return { strikeCalcValue: round(strikeTemp, 1) }
}

// Volumen de macerado
export function mashVolCalc(weight: string, thick: string, locale: Locale = 'es') {
  checkVal(weight, 'grainWeight', locale)
  checkVal(thick, 'waterPerKgGrain', locale)

  const w = parseFloatEx(weight)
  const t = parseFloatEx(thick)
  const vol = w * (0.67 + t)

  return { mashVolCalcValue: round(vol, 2) }
}

export function dilutionCalc(DO: string, DF: string, volume: string, locale: Locale = 'es') {
  checkVal(DO, 'currentDensity', locale)
  checkVal(DF, 'targetDensity', locale)
  checkVal(volume, 'volumeLiters', locale)

  const pointsDO = densityToPoints(parseFloatEx(DO))
  const pointsDF = densityToPoints(parseFloatEx(DF))
  const vol = parseFloatEx(volume)
  const water = (pointsDO * vol) / pointsDF - vol

  return { dilutionCalcValue: parseFloat(water.toString()).toFixed(3) }
}

export function evaporationCalc(
  densityBefore: string,
  volume: string,
  timeValue: string,
  densityAfter: string,
  locale: Locale = 'es',
) {
  checkVal(densityBefore, 'initialDensity', locale)
  checkVal(volume, 'initialVolume', locale)
  checkVal(timeValue, 'boilTime', locale)
  checkVal(densityAfter, 'finalDensity', locale)

  const pointsBefore = densityToPoints(parseFloatEx(densityBefore))
  const pointsAfter = densityToPoints(parseFloatEx(densityAfter))
  const vol = parseFloatEx(volume)
  const time = parseFloatEx(timeValue)

  const endVolume = (pointsBefore * vol) / pointsAfter
  const lostVolume = vol - endVolume
  const lostHour = (lostVolume / time) * 60

  return { evaporationResult: round(lostHour, 2), volumeEvaporationResult: round(endVolume, 1) }
}

export function initialCalc(
  densityAfter: string,
  volume: string,
  timeValue: string,
  evaporation: string,
  locale: Locale = 'es',
) {
  checkVal(densityAfter, 'densityAfterBoil', locale)
  checkVal(volume, 'volumeAfterBoil', locale)
  checkVal(timeValue, 'boilTime', locale)
  checkVal(evaporation, 'evaporationRate', locale)

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

// IBU (fórmula de Tinseth)
export function ibuCalc(
  weight: string,
  alphaAcid: string,
  boilTime: string,
  volume: string,
  gravity: string,
  locale: Locale = 'es',
) {
  checkVal(weight, 'hopWeight', locale)
  checkVal(alphaAcid, 'alphaAcid', locale)
  checkVal(boilTime, 'boilTimeMinutes', locale)
  checkVal(volume, 'wortVolume', locale)
  checkVal(gravity, 'boilGravity', locale)

  const w = parseFloatEx(weight)
  const aa = parseFloatEx(alphaAcid) / 100
  const time = parseFloatEx(boilTime)
  const vol = parseFloatEx(volume)
  let gravityParsed = parseFloatEx(gravity)
  if (gravityParsed.toString().indexOf('.') === -1) gravityParsed = gravityParsed / 1000

  const bignessFactor = 1.65 * Math.pow(0.000125, gravityParsed - 1)
  const boilTimeFactor = (1 - Math.exp(-0.04 * time)) / 4.15
  const utilization = bignessFactor * boilTimeFactor
  const mgPerLiter = (w * aa * 1000) / vol
  const ibu = utilization * mgPerLiter

  return { ibuCalcValue: round(ibu, 1) }
}

// Color final estimado (fórmula de Morey), en SRM y EBC
export function colorCalc(weight: string, colorLovibond: string, volume: string, locale: Locale = 'es') {
  checkVal(weight, 'grainWeight', locale)
  checkVal(colorLovibond, 'grainColorLovibond', locale)
  checkVal(volume, 'volumeLiters', locale)

  const weightLb = parseFloatEx(weight) * 2.20462
  const color = parseFloatEx(colorLovibond)
  const volumeGal = parseFloatEx(volume) * 0.264172

  const mcu = (weightLb * color) / volumeGal
  const srm = 1.4922 * Math.pow(mcu, 0.6859)
  const ebc = srm * 1.97

  return { srmCalcValue: round(srm, 1), ebcCalcValue: round(ebc, 1) }
}

// Azúcar de cebado para carbonatación en botella (azúcar de mesa)
export function carbonationCalc(volume: string, targetCO2: string, residualCO2: string, locale: Locale = 'es') {
  checkVal(volume, 'volumeLiters', locale)
  checkVal(targetCO2, 'targetCO2', locale)
  checkVal(residualCO2, 'residualCO2', locale)

  const vol = parseFloatEx(volume)
  const target = parseFloatEx(targetCO2)
  const residual = parseFloatEx(residualCO2)

  const sugar = 4 * vol * (target - residual)

  return { carbonationCalcValue: round(sugar, 1) }
}

// Eficiencia real del macerado vs. la densidad potencial del grano
export function efficiencyCalc(theoreticalDensity: string, actualDensity: string, locale: Locale = 'es') {
  checkVal(theoreticalDensity, 'theoreticalGrainDensity', locale)
  checkVal(actualDensity, 'actualDensity', locale)

  const potentialPoints = densityToPoints(parseFloatEx(theoreticalDensity))
  const actualPoints = densityToPoints(parseFloatEx(actualDensity))

  const efficiency = (actualPoints / potentialPoints) * 100

  return { efficiencyCalcValue: `${round(efficiency, 1)} %` }
}
