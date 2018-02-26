import { checkVal, parseFloatEx, round } from "../helpers"

// Correcion densimetro
export function hydrometerCorrection(hydrometer, temp, cTemp) {
	if (!checkVal(hydrometer, "Lectura densidad")) return
	if (!checkVal(temp, "Temperatura")) return
	if (!checkVal(cTemp, "Temperatura ajuste densimetro")) return

	let hydrometerParsed = parseFloatEx(hydrometer)
	if (hydrometerParsed.toString().indexOf(".") === -1) hydrometerParsed = hydrometerParsed / 1000
	let tempParsed = parseFloatEx(temp)
	let cTempParsed = parseFloatEx(cTemp)

	var value = round(
		hydrometerParsed + (CalculateTempCorrection(cTempParsed) / CalculateTempCorrection(tempParsed) - 1),
		3
	)
	return { cHydrometer: value }
}

const CalculateTempCorrection = temp => {
	return 1 - (temp + 288.9414) / (508929.2 * (temp + 68.12963)) * Math.pow(temp - 3.9863, 2)
}

// Calular alcohol y atenuacion
export function alcoholCalc(DO, DF) {
	if (!checkVal(DO, "Densidad inicial")) return
	if (!checkVal(DF, "Densidad final")) return

	let tempDO = DO
	let tempDF = DF
	if (tempDO.toString().indexOf(".") != -1)
		tempDO = tempDO
			.toFixed(3)
			.toString()
			.replace(".", "")
	if (tempDF.toString().indexOf(".") != -1)
		tempDF = tempDF
			.toFixed(3)
			.toString()
			.replace(".", "")

	var alcohol = (tempDO - tempDF) / 7.45

	tempDO = parseFloat(tempDO.toString().substring(1))
	tempDF = parseFloat(tempDF.toString().substring(1))

	var attenuation = (tempDO - tempDF) / tempDO * 100

	return {
		alcoholCalcValue: round(alcohol, 2) + " %",
		attenuationCalcValue: round(attenuation, 2) + " %"
	}
}
