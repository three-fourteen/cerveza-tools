# Próximos pasos — cerveza-tools

## Corto plazo

### 1. GitHub Actions CI
El `.travis.yml` actual apunta a Node.js 8 (EOL desde 2020).
Reemplazarlo con un workflow de GitHub Actions que ejecute tests en cada PR.

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - run: npm run build
```

### 2. Tests de componentes
Los tests actuales cubren solo la lógica de las calculadoras (funciones puras).
Faltan tests de integración de los componentes React con `@testing-library/react`.

Ejemplos a cubrir:
- Tipear un valor en un campo y verificar que se acepta
- Hacer click en "Calcular" con datos válidos y verificar el resultado renderizado
- Hacer click en "Calcular" con campos vacíos y verificar el mensaje de error
- Hacer click en "Limpiar" y verificar que el formulario se resetea

### 3. Verificar build de la librería
El script `npm run build` usa `vite build` + `vite-plugin-dts` para generar el `dist/`.
Verificar que produce correctamente:
- `dist/cerveza-tools.es.js`
- `dist/cerveza-tools.umd.js`
- `dist/index.d.ts` (declaraciones TypeScript)

---

## Medio plazo

### 4. Deploy del demo
Publicar el demo en GitHub Pages o Netlify para tenerlo accesible públicamente.
HashRouter ya está configurado, por lo que funciona sin servidor.

Opción recomendada — GitHub Pages con GitHub Actions:
```yaml
- run: vite build --config vite.demo.config.ts --outDir demo-dist
- uses: actions/deploy-pages@v4
```

### 5. Accesibilidad (a11y)
Problemas actuales identificados:
- Los `<input>` no tienen atributo `id`, por lo que el `htmlFor` del label no los vincula correctamente
- Falta `aria-describedby` para los mensajes de error
- Los botones "Calcular" y "Limpiar" podrían tener `aria-label` más descriptivo

### 6. CSS Modules
Los archivos `button.css` e `InputField.css` son CSS globales.
Al usar la librería, sus clases (`.btn`, `.form-group`, `.input-field`) pueden
colisionar con los estilos del proyecto consumidor.

Migrar a CSS Modules (`.module.css`) encapsula los estilos por componente.

---

## Largo plazo

### 7. Publicar en npm
Pasos para la versión 2.0.0:
1. Verificar que el build genera el `dist/` correctamente
2. Revisar `package.json`: `main`, `module`, `types`, `files`
3. Escribir `CHANGELOG.md`
4. `npm version 2.0.0`
5. `npm publish`

### 8. Más calculadoras
Calculadoras útiles que podrían añadirse:
- **IBU** — Unidades internacionales de amargor (método Tinseth o Rager)
- **Color SRM/EBC** — Estimación del color final de la cerveza
- **Carbonatación** — Cantidad de azúcar para carbonatación en botella
- **Eficiencia del macerado** — Eficiencia real vs. esperada
- **Conversión de unidades** — °Plato ↔ SG, Fahrenheit ↔ Celsius

---

## Estado actual del proyecto

| Área | Estado |
|------|--------|
| TypeScript | ✅ Migrado (strict mode) |
| React 18 | ✅ |
| Vite 5 | ✅ Build de librería + demo app |
| Componentes con hooks | ✅ (eliminadas clases) |
| Storybook 8 | ✅ CSF3 con Vite |
| Vitest + Testing Library | ✅ 21 tests pasando |
| Demo app con router | ✅ Home + 8 páginas |
| CI/CD | ⚠️ Travis CI desactualizado (Node 8) |
| Tests de componentes | ❌ Pendiente |
| Accesibilidad | ❌ Pendiente |
| CSS Modules | ❌ Pendiente |
| Publicado en npm | ❌ Pendiente |
