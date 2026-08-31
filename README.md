# cerveza-tools

[![CI](https://github.com/three-fourteen/cerveza-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/three-fourteen/cerveza-tools/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/cerveza-tools)](https://www.npmjs.com/package/cerveza-tools)

Librería React de calculadoras para el productor de cerveza artesanal.
Usada principalmente por [Cerveza Tools](https://cerveza.tools).

## Demo

**[https://three-fourteen.github.io/cerveza-tools/](https://three-fourteen.github.io/cerveza-tools/)**

Para correr la demo localmente:

```bash
npm install
npm run dev
```

## Calculadoras incluidas

| Componente | Descripción |
|---|---|
| `<Hydrometer />` | Corrección de densidad por temperatura |
| `<Alcohol />` | Volumen de alcohol y atenuación |
| `<Evaporation />` | Pérdida por evaporación durante el hervido |
| `<InitialDensity />` | Densidad y volumen antes de hervir |
| `<MashTemperature />` | Temperatura del agua de macerado (strike water) |
| `<MashVolume />` | Volumen total del macerado |
| `<StepMashing />` | Agua hirviendo para subir temperatura de macerado |
| `<WaterDilution />` | Agua a añadir para diluir la densidad |

## Instalación

```bash
npm install cerveza-tools
```

## Uso

```jsx
import { Alcohol, Hydrometer } from 'cerveza-tools'

function App() {
  return (
    <>
      <Alcohol title="Calcular alcohol" />
      <Hydrometer title="Corregir densidad" />
    </>
  )
}
```

Todos los componentes aceptan `title` e `intro` como props opcionales.

## Funciones de cálculo

Las calculadoras también se exportan como funciones puras, sin UI:

```ts
import {
  alcoholCalc,
  hydrometerCorrection,
  evaporationCalc,
  initialCalc,
  strikeCalc,
  mashVolCalc,
  restCalc,
  dilutionCalc,
} from 'cerveza-tools'

const { alcoholCalcValue, attenuationCalcValue } = alcoholCalc('1050', '1010')
```

Las funciones lanzan un `Error` si algún parámetro es inválido o está vacío.

## Desarrollo

```bash
npm install          # instalar dependencias
npm run dev          # demo app en http://localhost:5173
npm test             # tests (Vitest + Testing Library)
npm run build        # build de la librería → dist/
npm run build:demo   # build de la demo → dist-demo/
npm run storybook    # Storybook en http://localhost:8080
```

## Stack

- React 18 + TypeScript 5 (strict mode)
- Vite 5 (build de librería + demo app)
- Vitest + @testing-library/react (55 tests)
- Storybook 8
- CSS Modules

## Licencia

MIT
