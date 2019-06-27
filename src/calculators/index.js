import { checkVal, parseFloatEx, round } from '../helpers';

// Correcion densimetro
export function hydrometerCorrection(hydrometer, temp, cTemp) {
  if (!checkVal(hydrometer, 'Lectura densidad')) return;
  if (!checkVal(temp, 'Temperatura')) return;
  if (!checkVal(cTemp, 'Temperatura ajuste densimetro')) return;

  let hydrometerParsed = parseFloatEx(hydrometer);
  if (hydrometerParsed.toString().indexOf('.') === -1) hydrometerParsed = hydrometerParsed / 1000;
  let tempParsed = parseFloatEx(temp);
  let cTempParsed = parseFloatEx(cTemp);

  const value = round(
    hydrometerParsed + (CalculateTempCorrection(cTempParsed) / CalculateTempCorrection(tempParsed) - 1),
    3
  );
  return { cHydrometer: value };
}

const CalculateTempCorrection = temp => {
  return 1 - ((temp + 288.9414) / (508929.2 * (temp + 68.12963))) * Math.pow(temp - 3.9863, 2);
};

// Calular alcohol y atenuacion
export function alcoholCalc(DO, DF) {
  if (!checkVal(DO, 'Densidad inicial')) return;
  if (!checkVal(DF, 'Densidad final')) return;

  let tempDO = DO;
  let tempDF = DF;
  if (tempDO.toString().indexOf('.') != -1)
    tempDO = tempDO
      .toFixed(3)
      .toString()
      .replace('.', '');
  if (tempDF.toString().indexOf('.') != -1)
    tempDF = tempDF
      .toFixed(3)
      .toString()
      .replace('.', '');

  const alcohol = (tempDO - tempDF) / 7.45;

  tempDO = parseFloat(tempDO.toString().substring(1));
  tempDF = parseFloat(tempDF.toString().substring(1));

  const attenuation = ((tempDO - tempDF) / tempDO) * 100;

  return {
    alcoholCalcValue: `${round(alcohol, 2)} %`,
    attenuationCalcValue: `${round(attenuation, 2)} %`
  };
}

// Temperatura escalonada
export function restCalc(weight, thick, curtemp, tartemp) {
  if (!checkVal(weight, 'Peso del grano en Kg')) return;
  if (!checkVal(thick, 'Litros de agua por Kg de grano')) return;
  if (!checkVal(curtemp, 'Temperatura actual')) return;
  if (!checkVal(tartemp, 'Temperatura objetivo')) return;

  weight = parseFloatEx(weight);
  thick = parseFloatEx(thick);
  curtemp = parseFloatEx(curtemp);
  tartemp = parseFloatEx(tartemp);
  const strikeTemp = (weight * (0.4 + thick) * (tartemp - curtemp)) / (100 - tartemp);

  return { restCalcValue: round(strikeTemp, 1) };
}

// Temperatura macerado
export function strikeCalc(thick, strtemp, grntemp) {
  if (!checkVal(thick, 'Litros de agua por Kg de grano')) return;
  if (!checkVal(strtemp, 'Temperatura objetivo del macerado')) return;
  if (!checkVal(grntemp, 'Temperatura del grano')) return;

  thick = parseFloatEx(thick);
  strtemp = parseFloatEx(strtemp);
  grntemp = parseFloatEx(grntemp);

  const strikeTemp = strtemp + (0.4 * (strtemp - grntemp)) / thick + 1.7;

  return { strikeCalcValue: round(strikeTemp, 1) };
}

// Temperatura macerado
export function mashVolCalc(weight, thick) {
  if (!checkVal(weight, 'Peso del grano en Kg')) return;
  if (!checkVal(thick, 'Litros de agua por Kg de grano')) return;

  weight = parseFloatEx(weight);
  thick = parseFloatEx(thick);

  const vol = weight * (0.67 + thick);

  return { mashVolCalcValue: round(vol, 2) };
}

export function dilutionCalc(DO, DF, volume) {
  if (!checkVal(DO, 'Densidad actual')) return;
  if (!checkVal(DF, 'Densidad objetivo')) return;
  if (!checkVal(volume, 'Volumen en litros')) return;

  DO = parseFloatEx(DO);
  DF = parseFloatEx(DF);
  volume = parseFloatEx(volume);

  // TODO: move this cleanup to an external function
  let tempDO = DO;
  let tempDF = DF;
  if (tempDO.toString().indexOf('.') != -1)
    tempDO = tempDO
      .toFixed(3)
      .toString()
      .replace('.', '');
  if (tempDF.toString().indexOf('.') != -1)
    tempDF = tempDF
      .toFixed(3)
      .toString()
      .replace('.', '');

  tempDO = parseFloat(tempDO) - 1000;
  tempDF = parseFloat(tempDF) - 1000;

  const water = (tempDO * volume) / tempDF - volume;

  return { dilutionCalcValue: parseFloat(water).toFixed(3) };
}

export function evaporationCalc(densityBefore, volume, timeValue, densityAfter) {
  if (!checkVal(densityBefore, 'Densidad inicial')) return;
  if (!checkVal(volume, 'Volumen inicial')) return;
  if (!checkVal(timeValue, 'Tiempo hervido')) return;
  if (!checkVal(densityAfter, 'Densidad final')) return;

  densityBefore = parseFloatEx(densityBefore);
  volume = parseFloatEx(volume);
  timeValue = parseFloatEx(timeValue);
  densityAfter = parseFloatEx(densityAfter);

  if (densityBefore.toString().indexOf('.') != -1) {
    densityBefore = densityBefore
      .toFixed(3)
      .toString()
      .replace('.', '');
  }
  densityBefore = parseFloat(densityBefore) - 1000;
  if (densityAfter.toString().indexOf('.') != -1) {
    densityAfter = densityAfter
      .toFixed(3)
      .toString()
      .replace('.', '');
  }
  densityAfter = parseFloat(densityAfter) - 1000;

  const endVolume = (densityBefore * volume) / densityAfter;
  const lostVolume = volume - endVolume;
  const lostMinute = lostVolume / timeValue;
  const lostHour = lostMinute * 60;

  return { evaporationResult: round(lostHour, 2), volumeEevaporationResult: round(endVolume, 1) };
}


export function initialCalc(evaporation, volume, timeValue, densityAfter) {
	if (!checkVal(densityAfter, "Densidad después de hervir")) return;
	if (!checkVal(volume, "Volumen después de hervir")) return;
	if (!checkVal(timeValue, "Tiempo hervido")) return;
	if (!checkVal(evaporation, "Perdida de volumen en l/h")) return;

	densityAfter = parseFloatEx(densityAfter);
	volume = parseFloatEx(volume);
	timeValue = parseFloatEx(timeValue);
	evaporation = parseFloatEx(evaporation);

	if (densityAfter.toString().indexOf(".") != -1) {
		densityAfter = densityAfter.toFixed(3).toString().replace(".","")
	}
	densityAfter = parseFloat(densityAfter) - 1000;

	const initialVolume = volume + ((evaporation * timeValue) / 60);
	const initialDensity = (volume * densityAfter) / initialVolume;
	
	return {densityResult: parseFloat(1000 + initialDensity).toFixed(0), volumeResult: round(initialVolume, 2)}
}