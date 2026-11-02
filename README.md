# SuperInventario

Sitio web de gestión de inventario para un supermercado, desarrollado con **React**, **React Router**, **Context API** y **Tailwind CSS** (Vite).

🌐 **Sitio publicado:** https://carlosjrf.github.io/Exp1_PFY2202/

## Páginas

Menú de gestión (cabecera):

- **Inventario (`/inventario`)**: tabla con todos los artículos (nombre, marca, tipo y stock); permite ajustar stock y eliminar. Resalta los de stock bajo.
- **Agregar artículo (`/agregar`)**: formulario con validaciones para ingresar artículos nuevos.

Menú inferior:

- **Inicio (`/`)**: resumen del inventario y accesos rápidos.
- **Quiénes somos (`/quienes-somos`)**: misión, visión y valores.
- **Contáctanos (`/contactanos`)**: datos de contacto y formulario.
- Cualquier otra dirección muestra la página **NoEncontrado** con enlace al inicio.

## Estado global

La lista de artículos vive en un estado global (`InventarioProvider`, Context API) y se consume con el hook `useInventario`. Se guarda en `localStorage`, por lo que no se pierde al recargar.

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
├── context/                    # Estado global (contexto y proveedor)
├── hooks/useInventario.js      # Hook para usar el estado global
├── components/                 # Layout, Cabecera, MenuInferior, CampoFormulario,
│                               # FormularioProducto, TablaInventario, FilaProducto
└── pages/                      # Home, AgregarArticulo, Inventario,
                                # QuienesSomos, Contactanos, NoEncontrado
```
