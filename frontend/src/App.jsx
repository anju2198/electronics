import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Checkout from './pages/Checkout.jsx'
import Payment from './pages/Payment.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Orders from './pages/Orders.jsx'
import Dashboard from './admin/Dashboard.jsx'
import AdminProducts from './admin/Products.jsx'
import AdminOrders from './admin/Orders.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import AdminPlaceholder from './admin/AdminPlaceholder.jsx'
import AdminUsers from './admin/Users.jsx'
import './App.css'

export default function App() {
  return <BrowserRouter>
    <CartProvider><WishlistProvider><div className="storefront">
      <div className="announcement">Free shipping on orders over $75 <span>•</span> 30-day easy returns</div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminPlaceholder title="Categories" icon="🗂️" description="Organize products into clear storefront collections." />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="inventory" element={<AdminPlaceholder title="Inventory" icon="📦" description="Monitor stock levels across the catalog." />} />
            <Route path="coupons" element={<AdminPlaceholder title="Coupons" icon="🎟️" description="Create and manage promotional offers." />} />
            <Route path="reviews" element={<AdminPlaceholder title="Reviews" icon="⭐" description="Moderate product feedback and ratings." />} />
            <Route path="reports" element={<AdminPlaceholder title="Reports" icon="📈" description="Track store performance and sales activity." />} />
            <Route path="settings" element={<AdminPlaceholder title="Settings" icon="⚙️" description="Configure store and account preferences." />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div></WishlistProvider>
    </CartProvider>
  </BrowserRouter>
}
