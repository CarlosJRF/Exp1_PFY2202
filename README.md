# SuperInventario

Sitio web de gestión de inventario para un supermercado, desarrollado con **React**, **React Router**, HTML, CSS y JavaScript (Vite).

🌐 **Sitio publicado:** https://carlosjrf.github.io/Exp1_PFY2202/

## Páginas

- **Inicio (`/`)**: tabla de inventario donde se pueden agregar productos, ajustar stock y eliminarlos. Resalta productos con stock bajo.
- **Quiénes somos (`/quienes-somos`)**: información, misión, visión y valores del supermercado.
- **Contáctanos (`/contactanos`)**: datos de contacto y formulario.

La navegación se realiza desde un menú inferior fijo usando `NavLink` de React Router.

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
├── main.jsx                  # Monta la app dentro de BrowserRouter (con basename)
├── App.jsx                   # Define las rutas
├── index.css                 # Estilos
├── components/
│   └── MenuInferior.jsx      # Menú de navegación inferior
└── pages/
    ├── Home.jsx              # Gestión de inventario
    ├── QuienesSomos.jsx
    └── Contactanos.jsx
```
