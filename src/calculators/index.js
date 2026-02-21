import { checkVal, parseFloatEx, round } from '../helpers';

// Convierte densidad en formato 1040 o 1.040 a puntos de gravedad (ej: 40)
function densityToPoints(density) {
  let d = density;
  if (d.toString().indexOf('.') !== -1) {
    d = parseFloat(d.toFixed(3).replace('.', ''));
  }
  return parseFloat(d) - 1000;
}

// Correcion densimetro
export function hydrometerCorrection(hydrometer, temp, cTemp) {
  checkVal(hydrometer, 'Lectura densidad');
  checkVal(temp, 'Temperatura');
  checkVal(cTemp, 'Temperatura ajuste densimetro');

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

// Calcular alcohol y atenuacion
export function alcoholCalc(DO, DF) {
  checkVal(DO, 'Densidad inicial');
  checkVal(DF, 'Densidad final');

  const pointsDO = densityToPoints(parseFloatEx(DO));
  const pointsDF = densityToPoints(parseFloatEx(DF));

  const alcohol = (pointsDO - pointsDF) / 7.45;
  const attenuation = ((pointsDO - pointsDF) / pointsDO) * 100;

  return {
    alcoholCalcValue: `${round(alcohol, 2)} %`,
    attenuationCalcValue: `${round(attenuation, 2)} %`
  };
}

// Temperatura escalonada
export function restCalc(weight, thick, curtemp, tartemp) {
  checkVal(weight, 'Peso del grano en Kg');
  checkVal(thick, 'Litros de agua por Kg de grano');
  checkVal(curtemp, 'Temperatura actual');
  checkVal(tartemp, 'Temperatura objetivo');

  weight = parseFloatEx(weight);
  thick = parseFloatEx(thick);
  curtemp = parseFloatEx(curtemp);
  tartemp = parseFloatEx(tartemp);
  const strikeTemp = (weight * (0.4 + thick) * (tartemp - curtemp)) / (100 - tartemp);

  return { restCalcValue: round(strikeTemp, 1) };
}

// Temperatura macerado
export function strikeCalc(thick, strtemp, grntemp) {
  checkVal(thick, 'Litros de agua por Kg de grano');
  checkVal(strtemp, 'Temperatura objetivo del macerado');
  checkVal(grntemp, 'Temperatura del grano');

  thick = parseFloatEx(thick);
  strtemp = parseFloatEx(strtemp);
  grntemp = parseFloatEx(grntemp);

  const strikeTemp = strtemp + (0.4 * (strtemp - grntemp)) / thick + 1.7;

  return { strikeCalcValue: round(strikeTemp, 1) };
}

// Volumen de macerado
export function mashVolCalc(weight, thick) {
  checkVal(weight, 'Peso del grano en Kg');
  checkVal(thick, 'Litros de agua por Kg de grano');

  weight = parseFloatEx(weight);
  thick = parseFloatEx(thick);

  const vol = weight * (0.67 + thick);

  return { mashVolCalcValue: round(vol, 2) };
}

export function dilutionCalc(DO, DF, volume) {
  checkVal(DO, 'Densidad actual');
  checkVal(DF, 'Densidad objetivo');
  checkVal(volume, 'Volumen en litros');

  const pointsDO = densityToPoints(parseFloatEx(DO));
  const pointsDF = densityToPoints(parseFloatEx(DF));
  volume = parseFloatEx(volume);

  const water = (pointsDO * volume) / pointsDF - volume;

  return { dilutionCalcValue: parseFloat(water).toFixed(3) };
}

export function evaporationCalc(densityBefore, volume, timeValue, densityAfter) {
  checkVal(densityBefore, 'Densidad inicial');
  checkVal(volume, 'Volumen inicial');
  checkVal(timeValue, 'Tiempo hervido');
  checkVal(densityAfter, 'Densidad final');

  const pointsBefore = densityToPoints(parseFloatEx(densityBefore));
  const pointsAfter = densityToPoints(parseFloatEx(densityAfter));
  volume = parseFloatEx(volume);
  timeValue = parseFloatEx(timeValue);

  const endVolume = (pointsBefore * volume) / pointsAfter;
  const lostVolume = volume - endVolume;
  const lostMinute = lostVolume / timeValue;
  const lostHour = lostMinute * 60;

  return { evaporationResult: round(lostHour, 2), volumeEvaporationResult: round(endVolume, 1) };
}

export function initialCalc(evaporation, volume, timeValue, densityAfter) {
  checkVal(densityAfter, 'Densidad después de hervir');
  checkVal(volume, 'Volumen después de hervir');
  checkVal(timeValue, 'Tiempo hervido');
  checkVal(evaporation, 'Perdida de volumen en l/h');

  const pointsAfter = densityToPoints(parseFloatEx(densityAfter));
  volume = parseFloatEx(volume);
  timeValue = parseFloatEx(timeValue);
  evaporation = parseFloatEx(evaporation);

  const initialVolume = volume + ((evaporation * timeValue) / 60);
  const initialDensity = (volume * pointsAfter) / initialVolume;

  return { densityResult: parseFloat(1000 + initialDensity).toFixed(0), volumeResult: round(initialVolume, 2) };
}
