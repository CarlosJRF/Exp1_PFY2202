# SuperInventario

Sitio web de gestión de inventario para un supermercado, desarrollado con **React**, **React Router**, **Context API + useReducer** y **Tailwind CSS** (Vite).

🌐 **Sitio publicado:** https://carlosjrf.github.io/Exp1_PFY2202/

## Páginas

Menú de gestión (cabecera):

- **Inventario (`/inventario`)**: tabla con todos los artículos, **filtro por categoría**, ajuste de stock y eliminación con **modal de confirmación**. Resalta los de stock bajo.
- **Detalle (`/inventario/:id`)**: se abre al hacer clic en un artículo; permite **agregarlo al carrito**, lo que descuenta esa cantidad del inventario.
- **Agregar artículo (`/agregar`)**: formulario con validaciones (expresiones regulares) para ingresar artículos nuevos.
- **Carrito (`/carrito`)**: artículos agregados; aumentar o disminuir la cantidad actualiza el inventario, y "Quitar" devuelve todas las unidades.

Menú inferior:

- **Inicio (`/`)**: resumen del inventario y accesos rápidos.
- **Quiénes somos (`/quienes-somos`)**: misión, visión y valores.
- **Contáctanos (`/contactanos`)**: datos de contacto y formulario.
- Cualquier otra dirección muestra la página **NoEncontrado** con enlace al inicio.

## Estado global

Inventario y carrito viven en un único estado global (`InventarioProvider`, con `useReducer`) que se consume con el hook `useInventario`. Se guarda en `localStorage` con una clave versionada (`superinventario.v2`); al cargar se descartan datos dañados y se migran los inventarios guardados por la versión anterior.

## Ejecutar

```bash
npm install
npm run dev
```

## Despliegue

El sitio se publica en GitHub Pages con el workflow `.github/workflows/deploy.yml`, que se ejecuta con cada push a `main`.

## Estructura

```
src/
├── main.jsx                    # BrowserRouter + InventarioProvider
├── App.jsx                     # Definición de rutas
├── index.css                   # Tailwind CSS
├── data/productos.js           # Productos iniciales y tipos
├── utils/                      # Validaciones y almacenamiento (funciones puras)
├── context/                    # Contexto, reducer y proveedor del estado global
├── hooks/                      # useInventario, useFormulario
├── components/                 # Layout, Cabecera, MenuInferior, CampoFormulario,
│                               # FormularioProducto, TablaInventario, FilaProducto,
│                               # FiltroTipo, ModalConfirmacion, FilaCarrito
└── pages/                      # Home, AgregarArticulo, Inventario, DetalleArticulo,
                                # Carrito, QuienesSomos, Contactanos, NoEncontrado
```
