# cerveza-tools

[![CI](https://github.com/three-fourteen/cerveza-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/three-fourteen/cerveza-tools/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/cerveza-tools)](https://www.npmjs.com/package/cerveza-tools)

An open-source React library of reusable calculators for craft brewing. It
includes ready-to-use UI components, pure calculation functions,
internationalization, customizable theming, and optional WebMCP integration.

## Demo

**[https://three-fourteen.github.io/cerveza-tools/](https://three-fourteen.github.io/cerveza-tools/)**

To run the demo locally:

```bash
npm install
npm run dev
```

## Included calculators

| Component | Description |
|---|---|
| `<Hydrometer />` | Temperature correction for hydrometer readings |
| `<Alcohol />` | Alcohol by volume and attenuation |
| `<Evaporation />` | Boil-off loss |
| `<InitialDensity />` | Pre-boil gravity and volume |
| `<MashTemperature />` | Strike-water temperature |
| `<MashVolume />` | Total mash volume |
| `<StepMashing />` | Boiling water required to raise mash temperature |
| `<WaterDilution />` | Water required to dilute gravity |
| `<Ibu />` | Bitterness (IBU), using the Tinseth formula |
| `<Color />` | Estimated final color in SRM/EBC, using the Morey formula |
| `<Carbonation />` | Priming sugar for bottle carbonation |
| `<Efficiency />` | Actual mash efficiency versus potential efficiency |

## Installation

```bash
npm install cerveza-tools
```

## Usage

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

All components accept optional `title` and `intro` props.

## Theming

Form components (`Button`, `InputField`, and `NumericField`) use CSS custom
properties for colors and borders, with the current Bootstrap-inspired values
as fallbacks. To apply your own theme without overriding the CSS Modules,
define these variables in `:root` or in any container that wraps the
components:

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

The demo (`demo/styles.css`) uses this mechanism to apply its beer-inspired
brown theme without modifying the library.

## Calculation functions

The calculators are also exported as pure functions, with no UI:

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

The functions throw an `Error` when a parameter is invalid or empty.

## Internationalization

All components and calculation functions support Spanish (`'es'`, the default)
and English (`'en'`). Pass `locale` to an individual component:

```jsx
import { Alcohol } from 'cerveza-tools'

<Alcohol locale="en" />
```

Or wrap the entire app once with `LocaleProvider`:

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

An individual component's `locale` prop takes precedence over `LocaleProvider`.
Pure functions also accept `locale` as their final parameter:

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
reference host application for combining these context-free calculator tools
with brewing workflow state.

The dictionaries (`src/i18n/dictionaries/es.ts` and `en.ts`) are plain
translation objects. To add a language, create a dictionary that satisfies the
same `Dictionary` type and register it in `src/i18n/translate.ts`.

## Development

```bash
npm install          # install dependencies
npm run dev          # demo app at http://localhost:5173
npm test             # run tests (Vitest + Testing Library)
npm run build        # build the library → dist/
npm run build:demo   # build the demo → dist-demo/
npm run storybook    # start Storybook at http://localhost:8080
```

## Stack

- React 18 + TypeScript 5 (strict mode)
- Vite 5 (build de librería + demo app)
- Vitest + @testing-library/react (55 tests)
- Storybook 8
- CSS Modules

## License

GPL-3.0-or-later
