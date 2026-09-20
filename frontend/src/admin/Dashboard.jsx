import { Link } from 'react-router-dom'
export default function Dashboard() {
    return <section className="admin-section">
        <p className="eyebrow">Admin panel</p>
        <div className="admin-section-heading"><span className="admin-section-icon" aria-hidden="true">📊</span><div><h2>Dashboard</h2><p>Manage the Volt catalog, customers, and order queue.</p></div></div>
        <div className="admin-overview-grid">
            <Link className="admin-overview-card" to="/admin/products"><span>📦</span><strong>Products</strong><small>Manage catalog</small></Link>
            <Link className="admin-overview-card" to="/admin/orders"><span>🛒</span><strong>Orders</strong><small>Review order queue</small></Link>
            <Link className="admin-overview-card" to="/admin/users"><span>👥</span><strong>Users</strong><small>Customer accounts</small></Link>
        </div>
    </section>
}
