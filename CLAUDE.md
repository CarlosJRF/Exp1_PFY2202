# CLAUDE.md

Guía para trabajar en este repositorio (SuperInventario, asignatura PFY2202, Duoc UC).

## Actividad actual

**"Implementando gestión de estado en componentes frontend con React"** (continuación de la actividad formativa 1). Fuente: `Instrucciones especificas.odt` (no se sube, `*.odt` está en `.gitignore`).

Requisitos:

1. Un **nuevo menú** que navegue a **dos páginas nuevas**:
   - **Agregar artículo** (`/agregar`): formulario para ingresar artículos al inventario.
   - **Inventario** (`/inventario`): tabla con todos los artículos actuales.
2. **Estado global** con la lista de artículos (nombre, marca, tipo de producto) → Context API + hook `useInventario`.
3. **Framework CSS** para el estilo → Tailwind CSS (plugin `@tailwindcss/vite`).
4. Entrega: repositorio GitHub llamado `supermercado-nombre-apellido-siglaCurso`. Renombrar el repo es decisión del usuario; si cambia, actualizar `base` en `vite.config.js` y los enlaces del README.

Correcciones del avance anterior (todas deben quedar resueltas):

- Separar Home en componentes: `FormularioProducto`, `TablaInventario`, `FilaProducto`.
- Sacar cabecera/estructura de `App.jsx` a `Layout` + `Cabecera`; `App` solo define rutas.
- Datos iniciales en `src/data/`; gestión de estado agrupada en el hook `useInventario`.
- IDs con `crypto.randomUUID()` (no `Date.now()`) y persistencia en `localStorage`.
- Validaciones con mensajes visibles; stock solo entero y ≥ 0.
- Formularios unificados (ambos controlados, mismo componente de campo); confirmaciones que reflejen lo que realmente ocurre y que desaparezcan al volver a editar.
- Página `NoEncontrado` con enlace al inicio.

## Principios

- **Mantenerlo simple**: apegarse a las instrucciones, sin dependencias ni funciones extra.
- Código, nombres, comentarios y textos de la interfaz en **español**.
- `components/` = piezas reutilizables; `pages/` = vistas asociadas a una ruta.

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173/Exp1_PFY2202/
npm run build    # compila a dist/
npm run lint     # oxlint
```

## Estructura

```
src/
├── main.jsx                    # BrowserRouter (basename) + InventarioProvider
├── App.jsx                     # Solo rutas
├── index.css                   # Tailwind + clases de componente (@apply)
├── data/productos.js           # Productos iniciales y tipos de producto
├── context/
│   ├── InventarioContext.js    # createContext
│   └── InventarioProvider.jsx  # Estado global + persistencia localStorage
├── hooks/useInventario.js      # Acceso al estado global
├── components/                 # Layout, Cabecera, MenuInferior, CampoFormulario,
│                               # FormularioProducto, TablaInventario, FilaProducto
└── pages/                      # Home, AgregarArticulo, Inventario, QuienesSomos,
                                # Contactanos, NoEncontrado
```

## Despliegue

GitHub Pages vía `.github/workflows/deploy.yml` en cada push a `main` (copia `index.html` a `404.html` para el fallback de la SPA). `base: '/Exp1_PFY2202/'` en `vite.config.js` debe coincidir con el nombre del repo.

## Documento conceptual (educativo)

Al terminar cambios relevantes, actualizar `~/Escritorio/Explicacion_Exp1_PFY2202.odt` con la explicación de **todos** los conceptos de React/desarrollo web usados en el proyecto. Se regenera desde HTML con `soffice --headless --convert-to odt`. No se sube al repositorio.
