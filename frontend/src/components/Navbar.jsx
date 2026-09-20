import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { clearAuth } from '../services/auth.js'

export default function Navbar() {
  const { itemCount } = useCart()
  const [user, setUser] = useState(() => readUser())

  useEffect(() => {
    const updateUser = () => setUser(readUser())
    window.addEventListener('volt-auth-change', updateUser)
    window.addEventListener('storage', updateUser)
    return () => {
      window.removeEventListener('volt-auth-change', updateUser)
      window.removeEventListener('storage', updateUser)
    }
  }, [])

  const logout = () => clearAuth()

  return <header className="topbar"><Link className="wordmark" to="/">volt<i>•</i></Link>
    <nav>
      <Link to="/products">Shop</Link>
      <Link to="/">Our story</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/wishlist">Wishlist</Link>
      {user?.role === 'admin' && <Link to="/admin">Admin panel</Link>}
    </nav>
    <div className="header-actions">
      {user ?
        <div className="account-actions">
          <span className="account-name">Hi, {user.name}</span>
          <button className="logout-button" onClick={logout}>Log out</button>
        </div> : <Link className="login-button" to="/login">Log in <span>↗</span></Link>}
      <Link className="cart-button" to="/cart" aria-label={`Cart with ${itemCount} item${itemCount === 1 ? '' : 's'}`} title="Cart"><span aria-hidden="true">🛒</span><b>{itemCount}</b></Link>
    </div>
  </header>
}

function readUser() {
  if (!localStorage.getItem('volt_token')) return null
  try {
    return JSON.parse(localStorage.getItem('volt_user'))
  } catch {
    return null
  }
}
