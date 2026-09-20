import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearAuth } from '../services/auth.js'

const navigation = [
  { label: 'Dashboard', icon: '📊', to: '/admin', end: true },
  { label: 'Products', icon: '📦', to: '/admin/products' },
  { label: 'Categories', icon: '🗂️', to: '/admin/categories' },
  { label: 'Orders', icon: '🛒', to: '/admin/orders' },
  { label: 'Users', icon: '👥', to: '/admin/users' },
  { label: 'Inventory', icon: '📦', to: '/admin/inventory' },
  { label: 'Coupons', icon: '🎟️', to: '/admin/coupons' },
  { label: 'Reviews', icon: '⭐', to: '/admin/reviews' },
  { label: 'Reports', icon: '📈', to: '/admin/reports' },
  { label: 'Settings', icon: '⚙️', to: '/admin/settings' }
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const user = readUser()

  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />

  const logout = () => {
    clearAuth()
    navigate('/login', { replace: true })
  }

  return <section className="admin-shell">
    <aside className="admin-sidebar">
      <NavLink className="admin-brand" to="/admin" end><span>ElectroHub</span><small>ADMIN PANEL</small></NavLink>
      <nav className="admin-nav" aria-label="Admin navigation">
        {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>
          <span aria-hidden="true">{item.icon}</span>{item.label}
        </NavLink>)}
      </nav>
      <button className="admin-logout" onClick={logout}><span aria-hidden="true">🚪</span>Logout</button>
    </aside>
    <div className="admin-content"><Outlet /></div>
  </section>
}

function readUser() {
  try {
    return JSON.parse(localStorage.getItem('volt_user'))
  } catch {
    return null
  }
}