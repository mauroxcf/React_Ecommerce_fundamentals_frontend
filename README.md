# Fundamentals Store

Sample ecommerce built with **React 19**, **React Router** and **Tailwind CSS v4**.
It includes a Home page, a product list page (PLP), a product detail page (PDP) and a shopping cart.

The code is meant to be easy to read (even for junior developers), easy to extend,
and mindful of performance.

## Getting started

```bash
yarn install
yarn dev          # development server at http://localhost:5173
yarn build        # production build in /dist
yarn preview      # serves the production build
```

## Pages

| Route                      | Page                  | Description                                     |
| -------------------------- | --------------------- | ----------------------------------------------- |
| `/`                        | `HomePage`            | Banner, categories, featured products and brands |
| `/productos`               | `ProductListPage`     | Full catalog and search results (`?q=`)         |
| `/categoria/:categorySlug` | `ProductListPage`     | Products from a department or a subcategory     |
| `/producto/:slug`          | `ProductDetailPage`   | Product details                                 |
| `/carrito`                 | `CartPage`            | Shopping cart                                   |

> The store is aimed at Spanish-speaking customers, so URLs and UI text are in Spanish.

PLP filters live in the URL, so they can be shared and they work with the browser's "back" button:
`/categoria/snacks?marca=frito-lay&orden=price-asc`

## Folder structure

```
src/
├── app/                 # App bootstrap
│   ├── App.jsx          #   global providers (cart)
│   ├── router.jsx       #   route definitions (lazy-loaded pages)
│   └── routes.js        #   URL helpers: ROUTES.productDetail(slug)
├── pages/               # One page per route. Pages only ARRANGE components.
├── layouts/             # Shared structure (navbar + content + footer)
├── components/          # Components grouped by domain
│   ├── ui/              #   generic and reusable: Button, Badge, icons...
│   ├── layout/          #   Navbar, MegaMenu, MobileMenu, Footer...
│   ├── product/         #   ProductCard, ProductGrid, ProductPrice...
│   ├── home/            #   Home page sections
│   ├── plp/             #   list filters and sorting
│   ├── pdp/             #   product gallery, info and specifications
│   └── cart/            #   cart lines and summary
├── context/cart/        # Global cart state (Context + useReducer)
├── hooks/               # Custom hooks: useCart, useProducts, useProductFilters...
├── services/            # Data access (mock or backend)
│   ├── catalogService.js#   the ONLY entry point used by hooks
│   ├── adapters/        #   mockCatalogAdapter / httpCatalogAdapter
│   └── mappers/         #   productMapper: raw response -> app model
├── data/mocks/          # Mock data (10 brands x 3 products)
├── config/              # Configuration: store, environment, sort options
└── utils/               # Pure functions: formatPrice, categoryTree...
```

**Rule of thumb:** if a component is used on several pages, it goes in `components/ui` or
`components/product`; if it belongs to a single page, it goes in that page's folder
(`home`, `plp`, `pdp`, `cart`).

## Data flow

```
Component  ->  hook (useProducts)  ->  catalogService  ->  adapter (mock | http)
                                             │
                                             └─> productMapper -> Product model
```

- Components **never** import the mocks or call `fetch` directly.
- `catalogService` picks the data source based on the `VITE_API_BASE_URL` variable.
- `productMapper` converts whatever comes in (mock or backend) into the `Product` model
  used by the components. If the backend renames a field, only the mapper needs to change.

### Connecting the real backend

1. Copy `.env.example` to `.env` and set the URL:
   ```
   VITE_API_BASE_URL=http://localhost:4000/api
   ```
2. The backend should expose (proposal, adjustable in `httpCatalogAdapter.js`):

   | Endpoint                | Response                                                       |
   | ----------------------- | -------------------------------------------------------------- |
   | `GET /products`         | product list. Query: `category`, `brand`, `q`, `sort`, `tag`, `limit` |
   | `GET /products/:slug`   | a single product (404 if it doesn't exist)                     |
   | `GET /categories`       | category tree (`src/data/mocks/categories.js`)                 |
   | `GET /brands`           | brand list (`src/data/mocks/brands.js`)                        |

3. The shape of a "raw" product is documented in `src/data/mocks/products.js`
   (inspired by VTEX / Shopify):

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
     price: 3899000,          // selling price
     listPrice: 4499000,      // price before discount
     availableQuantity: 15,   // stock
     images: ['https://...'],
     specifications: { Almacenamiento: '256 GB', RAM: '8 GB' },
     tags: ['featured'],
   }
   ```

## Cart

- `CartProvider` stores the cart with `useReducer` and persists it to `localStorage`.
- `cartReducer.js` is a pure function with these actions: add, change quantity,
  remove and clear. The quantity never exceeds the available stock.
- Two hooks:
  - `useCart()` → data: `items`, `itemsCount`, `subtotal`, `discount`, `total`.
  - `useCartActions()` → functions: `addItem`, `updateQuantity`, `removeItem`, `clearCart`.

  If a component only **modifies** the cart (for example, the "Add" button), use
  `useCartActions`: that way it doesn't re-render every time the cart changes.

## Performance decisions

- **Per-page code splitting:** each page is loaded with `lazy()` only when it's visited.
- **Separate contexts** for cart state and cart actions (fewer re-renders).
- **`memo`** on `ProductCard` and `CartItem`, which are repeated in lists.
- **Images** with `width`/`height` (prevents layout shifts), `loading="lazy"` in
  lists and `fetchPriority="high"` on the main PDP image.
- **Image-free hero** (CSS only) for a fast LCP.
- **Inline SVG icons** instead of an icon library.
- **Uncontrolled search input**: it doesn't re-render on every keystroke.
- **In-memory cache** for categories and brands (fetched only once).
- `Intl.NumberFormat` is created only once in `formatPrice`.

## How to add new things

**A new Home section**
1. Create `src/components/home/MySection.jsx`.
2. Add it to `src/pages/HomePage.jsx` wherever you want it to appear.

**A new page**
1. Create `src/pages/MyPage.jsx`.
2. Add its URL to `src/app/routes.js`.
3. Register it with `lazy()` in `src/app/router.jsx`.

**A new PLP filter (for example, price)**
1. Create `src/components/plp/PriceFilter.jsx`.
2. Add it to `FilterSidebar.jsx`.
3. Read the new parameter in `useProductFilters.js` and pass it to the service.

**A new brand or product (while using mocks)**
Edit `src/data/mocks/brands.js` and `src/data/mocks/products.js`.

## Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):
`feat(plp): ...`, `fix(cart): ...`, `chore: ...`, `docs: ...`.
