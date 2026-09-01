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
| `<Ibu />` | Amargor (IBU) según la fórmula de Tinseth |
| `<Color />` | Color final estimado en SRM/EBC según la fórmula de Morey |
| `<Carbonation />` | Azúcar de cebado para carbonatación en botella |
| `<Efficiency />` | Eficiencia real del macerado vs. la potencial |

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

## Theming

Los componentes de formulario (`Button`, `InputField`, `NumericField`) usan
CSS custom properties para sus colores y bordes, con los valores actuales
(estilo Bootstrap) como fallback. Para aplicar tu propio tema sin sobreescribir
los módulos CSS, definí estas variables en tu `:root` (o en cualquier
contenedor que envuelva los componentes):

```css
:root {
  --ct-color-primary: #007bff;
  --ct-color-secondary: #6c757d;
  --ct-color-success: #28a745;
  --ct-color-danger: #dc3545;
  --ct-border-radius: 0.25rem;
  --ct-border-color: #ced4da;
  --ct-text-color: #495057;
  --ct-font-family: inherit;
}
```

La demo (`demo/styles.css`) usa este mecanismo para aplicar su tema
marrón/cerveza sin tocar la librería.

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
  ibuCalc,
  colorCalc,
  carbonationCalc,
  efficiencyCalc,
} from 'cerveza-tools'

const { alcoholCalcValue, attenuationCalcValue } = alcoholCalc('1050', '1010')
```

Las funciones lanzan un `Error` si algún parámetro es inválido o está vacío.

## Internacionalización

Todos los componentes y funciones de cálculo soportan español (`'es'`, por
defecto) e inglés (`'en'`). Podés pasar `locale` a cada componente:

```jsx
import { Alcohol } from 'cerveza-tools'

<Alcohol locale="en" />
```

O envolver toda la app una sola vez con `LocaleProvider`:

```jsx
import { LocaleProvider, Alcohol, Hydrometer } from 'cerveza-tools'

function App() {
  return (
    <LocaleProvider locale="en">
      <Alcohol />
      <Hydrometer />
    </LocaleProvider>
  )
}
```

Una prop `locale` en un componente puntual tiene prioridad sobre el
`LocaleProvider`. Las funciones puras también aceptan `locale` como último
parámetro:

```ts
alcoholCalc('1050', '1010', 'en')
```

## WebMCP

Cerveza Tools can optionally expose selected brewing calculations as structured
tools for WebMCP-compatible agents. This is an explicit browser-only opt-in:
normal components and pure calculation functions neither load nor register
WebMCP tools.

```ts
import { registerBrewingCalculatorTools } from 'cerveza-tools/webmcp'

const tools = await registerBrewingCalculatorTools({
  calculators: ['hydrometer', 'alcohol', 'dilution', 'ibu', 'carbonation'],
  locale: 'en',
})

if (tools.supported) {
  // Call tools.unregister() when the host application no longer needs them.
}
```

The available tools are `brewing_correct_hydrometer`,
`brewing_calculate_alcohol`, `brewing_calculate_dilution`,
`brewing_calculate_ibu`, and `brewing_calculate_carbonation`. Individual tools
can be selected with `calculators`, or all five can be registered with
`calculators: 'all'`.

WebMCP support depends on the native `document.modelContext` browser API. When
it is unavailable, registration returns `{ supported: false }`; calculator UI
and pure functions continue to work normally. Cerveza Tools Lab is the
reference host application for composing these context-free calculator tools
with brewing workflow state.

Los diccionarios (`src/i18n/dictionaries/es.ts` y `en.ts`) son objetos planos
de traducciones; para agregar un idioma nuevo alcanza con crear un diccionario
que cumpla el mismo `Dictionary` type y registrarlo en `src/i18n/translate.ts`.

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

GPL-3.0-or-later
