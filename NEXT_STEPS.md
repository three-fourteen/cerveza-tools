# Próximos pasos — cerveza-tools

## Estado actual

| Área | Estado |
|------|--------|
| TypeScript (strict mode) | ✅ |
| React 18 + hooks | ✅ |
| Vite 5 (librería + demo) | ✅ |
| Storybook 8 | ✅ |
| Vitest + Testing Library | ✅ 55 tests |
| Demo app (Home + 8 páginas) | ✅ |
| GitHub Actions CI | ✅ Node 20 + 22 |
| Tests de componentes | ✅ Los 8 calculadores |
| Accesibilidad (id, aria) | ✅ |
| CSS Modules | ✅ |
| Deploy demo a GitHub Pages | ✅ (activo al mergear a main) |
| Publicado en npm | ❌ |
| Storybook con args/argTypes (Controls) | ✅ |
| CSS custom properties para theming | ✅ |
| Calculadoras: IBU, Color, Carbonatación, Eficiencia | ✅ |
| Internacionalización (es/en) | ✅ |

---

## Corto plazo

### 1. Activar GitHub Pages
En el repositorio: **Settings → Pages → Source → GitHub Actions**.
A partir de ahí, cada push a `main` despliega la demo automáticamente en
`https://three-fourteen.github.io/cerveza-tools/`.

### 2. Publicar en npm
Pasos para la versión 2.0.0:
1. Verificar build: `npm run build` → `dist/cerveza-tools.es.js`, `.umd.js`, `index.d.ts`
2. Revisar `package.json`: `main`, `module`, `types`, `files`, `homepage`
3. `npm version 2.0.0`
4. `npm publish --access public`

---

## Medio plazo

### 3. ~~Tema visual de la demo en la librería~~ ✅
Los componentes de formulario (`Button`, `InputField`, `NumericField`) ya
exponen CSS custom properties (`--ct-color-primary`, `--ct-border-radius`,
etc.) con los valores Bootstrap como fallback. Ver sección "Theming" del
README. `demo/styles.css` las usa para aplicar el tema marrón/cerveza.

### 4. ~~Storybook: migrar de Knobs a Controls~~ ✅
Cada componente tiene su propio archivo de story (`stories/calculators/*`,
`stories/form/*`) con `args`/`argTypes` de Storybook 8, con Controls
interactivos en el panel.

### 5. ~~Más calculadoras~~ ✅ (IBU, Color, Carbonatación, Eficiencia)
- **IBU** — `<Ibu />` / `ibuCalc` (fórmula de Tinseth)
- **Color SRM/EBC** — `<Color />` / `colorCalc` (fórmula de Morey)
- **Carbonatación** — `<Carbonation />` / `carbonationCalc`
- **Eficiencia del macerado** — `<Efficiency />` / `efficiencyCalc`
- **Conversión de unidades** — °Plato ↔ SG, °F ↔ °C — pendiente

---

## Largo plazo

### 6. ~~Internacionalización~~ ✅
Todos los componentes y funciones de cálculo aceptan una prop/parámetro
`locale` (`'es'` por defecto, o `'en'`), y hay un `LocaleProvider` para
setearlo una sola vez a nivel de app. Ver sección "Internacionalización"
del README. Diccionarios en `src/i18n/dictionaries/`.

### 7. Accesibilidad avanzada
- `aria-label` más descriptivo en los botones ("Calcular alcohol", "Limpiar formulario")
- Tests de accesibilidad automáticos con `jest-axe` o `axe-playwright`
- Navegación completa con teclado verificada manualmente
