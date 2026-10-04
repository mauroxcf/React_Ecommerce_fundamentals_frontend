# Fundamentals Store

Ecommerce de ejemplo construido con **React 19**, **React Router** y **Tailwind CSS v4**.
Incluye Home, listado de productos (PLP), detalle de producto (PDP) y carrito de compras.

El código está pensado para que sea fácil de leer (incluso para desarrolladores junior),
fácil de extender y cuidando el performance.

## Cómo correrlo

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # build de producción en /dist
npm run preview   # sirve el build de producción
```

## Páginas

| Ruta                       | Página                | Descripción                                        |
| -------------------------- | --------------------- | -------------------------------------------------- |
| `/`                        | `HomePage`            | Banner, categorías, destacados y marcas            |
| `/productos`               | `ProductListPage`     | Todo el catálogo y resultados de búsqueda (`?q=`)  |
| `/categoria/:categorySlug` | `ProductListPage`     | Productos de un departamento o una subcategoría    |
| `/producto/:slug`          | `ProductDetailPage`   | Detalle del producto                               |
| `/carrito`                 | `CartPage`            | Carrito de compras                                 |

Los filtros de la PLP viven en la URL, así se pueden compartir y funcionan con el botón "atrás":
`/categoria/snacks?marca=frito-lay&orden=price-asc`

## Estructura de carpetas

```
src/
├── app/                 # Arranque de la app
│   ├── App.jsx          #   providers globales (carrito)
│   ├── router.jsx       #   definición de rutas (páginas con lazy loading)
│   └── routes.js        #   helpers de URLs: ROUTES.productDetail(slug)
├── pages/               # Una página por ruta. Sólo ORDENAN componentes.
├── layouts/             # Estructura común (navbar + contenido + footer)
├── components/          # Componentes agrupados por dominio
│   ├── ui/              #   genéricos y reutilizables: Button, Badge, íconos...
│   ├── layout/          #   Navbar, MegaMenu, MobileMenu, Footer...
│   ├── product/         #   ProductCard, ProductGrid, ProductPrice...
│   ├── home/            #   secciones de la Home
│   ├── plp/             #   filtros y ordenamiento del listado
│   ├── pdp/             #   galería, info y especificaciones del producto
│   └── cart/            #   líneas y resumen del carrito
├── context/cart/        # Estado global del carrito (Context + useReducer)
├── hooks/               # Hooks propios: useCart, useProducts, useProductFilters...
├── services/            # Acceso a datos (mock o backend)
│   ├── catalogService.js#   ÚNICO punto que usan los hooks
│   ├── adapters/        #   mockCatalogAdapter / httpCatalogAdapter
│   └── mappers/         #   productMapper: respuesta cruda -> modelo de la app
├── data/mocks/          # Datos de prueba (10 marcas x 3 productos)
├── config/              # Configuración: tienda, entorno, opciones de orden
└── utils/               # Funciones puras: formatPrice, categoryTree...
```

**Regla general:** si un componente se usa en varias páginas va en `components/ui` o
`components/product`; si es propio de una página va en la carpeta de esa página
(`home`, `plp`, `pdp`, `cart`).

## Cómo fluyen los datos

```
Componente  ->  hook (useProducts)  ->  catalogService  ->  adapter (mock | http)
                                              │
                                              └─> productMapper -> modelo Product
```

- Los componentes **nunca** importan los mocks ni hacen `fetch` directamente.
- `catalogService` decide la fuente de datos según la variable `VITE_API_BASE_URL`.
- `productMapper` convierte lo que llega (mock o backend) al modelo `Product` que usan
  los componentes. Si el backend cambia un nombre de campo, sólo se ajusta el mapper.

### Conectar el backend real

1. Copia `.env.example` a `.env` y define la URL:
   ```
   VITE_API_BASE_URL=http://localhost:4000/api
   ```
2. El backend debe exponer (propuesta, ajustable en `httpCatalogAdapter.js`):

   | Endpoint                | Respuesta                                                      |
   | ----------------------- | -------------------------------------------------------------- |
   | `GET /products`         | lista de productos. Query: `category`, `brand`, `q`, `sort`, `tag`, `limit` |
   | `GET /products/:slug`   | un producto (404 si no existe)                                 |
   | `GET /categories`       | árbol de categorías (`src/data/mocks/categories.js`)           |
   | `GET /brands`           | lista de marcas (`src/data/mocks/brands.js`)                   |

3. La forma de un producto "crudo" está documentada en `src/data/mocks/products.js`
   (inspirada en VTEX / Shopify):

   ```js
   {
     productId: '2001',
     sku: 'SAM-S24-256-BLK',
     slug: 'celular-samsung-galaxy-s24-256gb',
     name: 'Celular Samsung Galaxy S24 256 GB Negro',
     description: '...',
     brand: { id: 'samsung', name: 'Samsung', slug: 'samsung' },
     categoryId: 'celulares',
     seller: { id: 'samsung-store', name: 'Samsung Store Oficial' },
     price: 3899000,          // precio de venta
     listPrice: 4499000,      // precio antes del descuento
     availableQuantity: 15,   // stock
     images: ['https://...'],
     specifications: { Almacenamiento: '256 GB', RAM: '8 GB' },
     tags: ['featured'],
   }
   ```

## Carrito

- `CartProvider` guarda el carrito con `useReducer` y lo persiste en `localStorage`.
- `cartReducer.js` es una función pura con las acciones: agregar, cambiar cantidad,
  eliminar y vaciar. La cantidad nunca supera el stock disponible.
- Dos hooks:
  - `useCart()` → datos: `items`, `itemsCount`, `subtotal`, `discount`, `total`.
  - `useCartActions()` → funciones: `addItem`, `updateQuantity`, `removeItem`, `clearCart`.

  Si un componente sólo **modifica** el carrito (por ejemplo, el botón "Agregar"), usa
  `useCartActions`: así no se vuelve a renderizar cada vez que el carrito cambia.

## Decisiones de performance

- **Code splitting por página:** cada página se carga con `lazy()` sólo cuando se visita.
- **Contextos separados** para estado y acciones del carrito (menos re-renders).
- **`memo`** en `ProductCard` y `CartItem`, que se repiten en listas.
- **Imágenes** con `width`/`height` (evita saltos de layout), `loading="lazy"` en
  listados y `fetchPriority="high"` en la imagen principal de la PDP.
- **Hero sin imagen** (sólo CSS) para un LCP rápido.
- **Íconos SVG en línea** en vez de una librería de íconos.
- **Búsqueda con input no controlado**: no re-renderiza en cada tecla.
- **Caché en memoria** de categorías y marcas (se piden una sola vez).
- `Intl.NumberFormat` se crea una sola vez en `formatPrice`.

## Cómo agregar cosas nuevas

**Una sección nueva en la Home**
1. Crea `src/components/home/MiSeccion.jsx`.
2. Agrégala en `src/pages/HomePage.jsx` donde quieras que aparezca.

**Una página nueva**
1. Crea `src/pages/MiPagina.jsx`.
2. Agrega su URL en `src/app/routes.js`.
3. Regístrala con `lazy()` en `src/app/router.jsx`.

**Un filtro nuevo en la PLP (por ejemplo, precio)**
1. Crea `src/components/plp/PriceFilter.jsx`.
2. Agrégalo en `FilterSidebar.jsx`.
3. Lee el nuevo parámetro en `useProductFilters.js` y pásalo al servicio.

**Una marca o producto nuevo (mientras se usan mocks)**
Edita `src/data/mocks/brands.js` y `src/data/mocks/products.js`.

## Convención de commits

Se usa [Conventional Commits](https://www.conventionalcommits.org/es/):
`feat(plp): ...`, `fix(cart): ...`, `chore: ...`, `docs: ...`.
