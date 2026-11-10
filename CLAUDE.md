# CLAUDE.md

Guía para trabajar en este repositorio (SuperInventario, asignatura PFY2202, Duoc UC).

## Actividad actual (Semana 3, forma B)

**"Desarrollando sitios web con React avanzado"**. Fuente: `~/Descargas/PFY2202_Exp1_S3_Instrucciones_especificas (forma B).docx.odt`. Continúa las entregas anteriores (agregar artículo `/agregar` e inventario `/inventario`, ya hechas).

Requisitos nuevos:

1. **Filtro por categoría** en `/inventario`: un `<select>` con los tipos de producto. El filtro vive en la URL (`?tipo=Lácteos`, con `useSearchParams`) para conservarse al volver del detalle; la lista mostrada se **deriva** del inventario (`filter`), sin modificar los datos originales.
2. **Detalle de artículo** (`/inventario/:id`): al hacer clic en un artículo de la lista se muestra su detalle y se puede **agregar al carrito** una cantidad; esa cantidad se **resta del stock** del inventario.
3. **Carrito** (`/carrito`, enlace en el menú de la cabecera con contador): lista los artículos agregados; aumentar (+1) resta 1 del inventario, disminuir (−1) lo devuelve, "Quitar" devuelve todo. El −1 se desactiva en 1 y el +1 sin stock.
4. Seguir usando **Tailwind CSS**.
5. Entrega: repositorio `supermercado-nombre-apellido-siglaCurso` (renombrar es decisión del usuario; si cambia, actualizar `base` en `vite.config.js` y los enlaces del README).

Mejoras y refactorización pedidas:

- Migrar de `react-router-dom` a **`react-router`** (v7 incluye todo; `react-router-dom` solo reexporta).
- Validar **nombre y marca con expresiones regulares** (caracteres admitidos y largo razonable). Reglas en `src/utils/validaciones.js`.
- Lógica repetida de formularios (valores, errores, cambios, envío) en el hook genérico **`useFormulario`**, usado por FormularioProducto, Contactanos y el formulario de cantidad del detalle.
- **Modal de confirmación** (`ModalConfirmacion`, con `<dialog>`) antes de eliminar un producto, nombrando el artículo.
- En el estado global, `agregarProducto` **valida los datos** (rechaza incompletos) y la lectura de `localStorage` **verifica que sea un arreglo de productos válidos** (descarta los dañados).
- **IDs uniformes**: todos con formato UUID. Los iniciales usan UUID fijos (predecibles para pruebas); los nuevos `crypto.randomUUID()`.
- **Clave de `localStorage` versionada** (`superinventario.v2`, guarda `{ version, productos, carrito }`) con **migración** desde la clave antigua `superinventario.productos` (v1: arreglo de productos, ids `inicial-N`), sin perder el inventario existente.
- Documentar escenarios: entradas inválidas, almacenamiento alterado y eliminaciones accidentales, con el comportamiento esperado.

Ya resueltas en entregas anteriores (mantener): Home separado en componentes, `Layout` + `Cabecera`, `App` solo rutas, datos en `src/data/`, persistencia, validación con mensajes y stock entero ≥ 0, formularios controlados, página `NoEncontrado`.

## Arquitectura del estado

- Un solo estado global `{ productos, carrito }` manejado con **`useReducer`** (`src/context/inventarioReducer.js`): agregar al carrito y cambiar cantidades modifican inventario y carrito en **una misma acción**, así nunca quedan desincronizados.
- Ítem del carrito: `{ productoId, cantidad }` (los datos del producto se leen del inventario).
- Eliminar un producto también quita su línea del carrito.
- `InventarioProvider` expone acciones con nombre (`agregarProducto`, `agregarAlCarrito`, etc.); los componentes usan `useInventario()`.
- Persistencia y migraciones en `src/utils/almacenamiento.js`.

## Convenciones de interfaz

- Tablas con las clases compartidas `.tabla-contenedor` y `.tabla` (`index.css`); en celulares se ocultan columnas secundarias con `hidden sm:table-cell` y su dato se muestra bajo el nombre. Deben caber en 360 px sin desplazamiento horizontal.
- Botones que no pueden actuar se desactivan (`disabled`); `.boton` ya trae el estilo desactivado.
- Dentro de una fila clicable, enlaces y botones llaman a `stopPropagation` para no navegar dos veces.
- Mensajes con cantidades usan `contar()` para singular/plural.

## Principios

- **Mantenerlo simple**: apegarse a las instrucciones, sin dependencias ni funciones extra (no precios, pagos ni backend).
- Código, nombres, comentarios y textos de la interfaz en **español**.
- `components/` = piezas reutilizables; `pages/` = vistas asociadas a una ruta; `utils/` = funciones puras sin React.

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
├── data/productos.js           # Productos iniciales (UUID fijos), tipos, umbral stock bajo
├── utils/
│   ├── validaciones.js         # Expresiones regulares y funciones validar*
│   ├── almacenamiento.js       # Clave versionada, carga segura y migración
│   └── texto.js                # contar(): singular/plural en los mensajes
├── context/
│   ├── InventarioContext.js    # createContext
│   ├── inventarioReducer.js    # Reducer de productos + carrito
│   └── InventarioProvider.jsx  # useReducer + persistencia + acciones
├── hooks/
│   ├── useInventario.js        # Acceso al estado global
│   └── useFormulario.js        # Valores, errores y envío de formularios
├── components/                 # Layout, Cabecera, MenuInferior, CampoFormulario,
│                               # FormularioProducto, TablaInventario, FilaProducto,
│                               # FiltroTipo, ModalConfirmacion, TablaCarrito, FilaCarrito
└── pages/                      # Home, AgregarArticulo, Inventario, DetalleArticulo,
                                # Carrito, QuienesSomos, Contactanos, NoEncontrado
```

## Despliegue

GitHub Pages vía `.github/workflows/deploy.yml` en cada push a `main` (copia `index.html` a `404.html` para el fallback de la SPA). `base: '/Exp1_PFY2202/'` en `vite.config.js` debe coincidir con el nombre del repo.

## Documento conceptual (educativo)

Al terminar cambios relevantes, actualizar `~/Escritorio/Explicacion_Exp1_PFY2202.odt`. Debe explicar **todos los avances** del sistema, el **flujo de datos y su lógica**, las **decisiones de arquitectura** y cada fundamento de front end avanzado usado, más los escenarios de error. Se regenera desde HTML con `soffice --headless --convert-to odt` (guardar la versión anterior como respaldo). No se sube al repositorio (`*.odt` en `.gitignore`).
