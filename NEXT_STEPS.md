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

### 3. Tema visual de la demo en la librería
Los componentes usan CSS Modules con los colores base de Bootstrap.
Para que se vean con el tema marrón/cerveza fuera de la demo, se pueden
exponer CSS custom properties (variables) que el consumidor sobreescriba:

```css
:root {
  --ct-color-primary: #007bff;
  --ct-border-radius: 0.25rem;
}
```

### 4. Storybook: migrar de Knobs a Controls
Los stories actuales usan la API heredada. Migrar a `args` + `argTypes`
de Storybook 8 para aprovechar los controles interactivos del panel.

### 5. Más calculadoras
- **IBU** — Unidades de amargor (Tinseth / Rager)
- **Color SRM/EBC** — Color final estimado de la cerveza
- **Carbonatación** — Azúcar para carbonatación en botella
- **Eficiencia del macerado** — Eficiencia real vs. esperada
- **Conversión de unidades** — °Plato ↔ SG, °F ↔ °C

---

## Largo plazo

### 6. Internacionalización
Los textos están hardcodeados en español. Exponer los labels como props
permite que el consumidor los traduzca sin forkear la librería.

### 7. Accesibilidad avanzada
- `aria-label` más descriptivo en los botones ("Calcular alcohol", "Limpiar formulario")
- Tests de accesibilidad automáticos con `jest-axe` o `axe-playwright`
- Navegación completa con teclado verificada manualmente
