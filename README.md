# Volt Supply Co.

Volt Supply Co. is a full-stack electronics ecommerce application. Customers can browse products, manage a cart, create an account, sign in, place orders, and review their order history. Administrators have separate product and order management views.

The project is split into a React/Vite frontend and a Node.js/Express backend. MongoDB is supported for persistent products, users, and orders, but the frontend can also be demonstrated with fallback product data when a database is not configured.

## Features

### Customer experience

- Home page with featured store content.
- Product catalogue with category filtering.
- Product detail pages.
- Cart with quantity tracking and totals.
- Registration and login with JWT authentication.
- Checkout and order creation.
- Authenticated order history.

### Administration

- Admin dashboard.
- Create and delete products.
- View orders and update order status.
- Protected admin API routes requiring a JWT for a user with the `admin` role.

### Technical features

- React 19 and React Router for the client application.
- Express 5 API with separated routes, controllers, models, and middleware.
- Mongoose connection to MongoDB or MongoDB Atlas.
- Password hashing with `bcryptjs`.
- JWT-based authentication with customer and admin guards.
- Shared cart state through React Context.
- Centralized frontend requests in `frontend/src/services/api.js`.

## Project structure

```text
electronicecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, Footer, ProductCard, Loader
│   │   ├── pages/        # Customer-facing pages
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── services/     # API and authentication helpers
│   │   ├── context/      # CartContext
│   │   ├── App.jsx       # Router and shared providers
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/           # MongoDB collection access
│   ├── routes/           # API route definitions
│   ├── middleware/       # Auth and admin guards
│   ├── config/db.js      # MongoDB connection
│   ├── server.js         # API entrypoint
│   ├── package.json
│   └── .env.example      # MongoDB configuration template
└── README.md
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB is optional for the demo and required for persisted products, users, and orders.

## Installation

Install dependencies for both applications from the project root:

```bash
npm --prefix frontend install
npm --prefix backend install
```

## Run the frontend

From the project root, start the Vite development server:

```bash
npm --prefix frontend run dev
```

Open http://localhost:5173/.

Production build:

```bash
npm --prefix frontend run build
```

## Run the backend

Open a second terminal in the project root:

```bash
npm --prefix backend install
npm --prefix backend run dev
```

The API runs at http://localhost:5000.

Run the frontend and backend in separate terminals during development.

## Configure MongoDB

Create `backend/.env` with the following values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017
```

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port used by the Express API | `5000` |
| `MONGODB_URI` | Local MongoDB or MongoDB Atlas connection string | Not configured |

For MongoDB Atlas, replace `MONGODB_URI` with the Atlas connection string. The API uses Mongoose models for the `users`, `products`, and `orders` collections.

Without `MONGODB_URI`, the server continues with demo products and returns demo order IDs, so the catalogue and checkout flow can be developed without a database. User accounts and persisted orders require MongoDB.

The frontend uses `http://localhost:5000/api` by default. To point it at another API, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## API endpoints

### `GET /api/health`

Returns server and database configuration status:

```json
{
  "status": "ok",
  "database": {
    "configured": false,
    "connected": false
  }
}
```

### `GET /api/products`

Returns products from MongoDB, or fallback demo products when the database is unavailable.

### `POST /api/auth/register` and `POST /api/auth/login`

Create an account or receive a JWT token. Send the token as `Authorization: Bearer <token>` for protected routes.

### `GET /api/auth/me`

Returns the currently authenticated user. Requires a bearer token.

### `GET /api/orders` and `POST /api/orders`

Protected customer routes for reading orders and creating a new order.

### Admin routes

- `POST /api/products` creates a product.
- `DELETE /api/products/:id` deletes a product.
- `PATCH /api/orders/:id/status` updates order status.

All admin routes require a JWT for a user with `role: "admin"`.

### `POST /api/orders`

Creates an order. The request body requires `items` and `email`:

```json
{
  "email": "customer@example.com",
  "items": [{ "id": 1, "name": "Studio Pro Max", "price": 349 }]
}
```

## Frontend services

The `frontend/src/services/` directory keeps network and authentication logic out of page components:

- `api.js` provides functions for product, authentication, and order requests. It reads `volt_token` from `localStorage` and attaches it as a bearer token when available.
- `auth.js` saves or clears the token and user details in `localStorage`, then emits `volt-auth-change` so the interface can refresh authentication state.

Cart contents are managed separately by `frontend/src/context/CartContext.jsx` and remain in React state for the current browser session.

## Useful commands

```bash
# Frontend development server
npm --prefix frontend run dev

# Frontend production build
npm --prefix frontend run build

# Frontend linting
npm --prefix frontend run lint

# Backend development server with file watching
npm --prefix backend run dev

# Backend server with nodemon
npm --prefix backend start
```

## Health check

Once the backend is running, visit [`http://localhost:5000/api/health`](http://localhost:5000/api/health). A healthy response looks like:

```json
{
  "status": "ok",
  "database": {
    "configured": false,
    "connected": false
  }
}
```

If `MONGODB_URI` is configured but the database cannot be reached, the endpoint reports a degraded status.

## Development notes

- The frontend and backend are independent npm projects with their own `package.json` files.
- CORS is enabled by the backend for local frontend development.
- Product listing routes are public.
- Order routes require authentication; admin operations require authentication plus the admin role.
- Never commit real MongoDB connection strings or JWT secrets to the repository.

## Verification completed

- Frontend production build passes with `npm --prefix frontend run build`.
- Backend passes `node --check server.js`.
- Backend health endpoint responds successfully on port 5000.
