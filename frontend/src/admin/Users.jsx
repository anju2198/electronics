import { useEffect, useState } from 'react'
import { api } from '../services/api.js'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getUsers().then(setUsers).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false))
  }, [])

  return <section className="admin-section">
    <p className="eyebrow">Admin panel</p>
    <div className="admin-section-heading"><span className="admin-section-icon" aria-hidden="true">👥</span><div><h2>Users</h2><p>View and manage customer accounts.</p></div></div>
    {loading ? <p className="empty-state">Loading users...</p> : error ? <p className="error" role="alert">{error}</p> : users.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td><span className={`role-badge role-${user.role}`}>{user.role}</span></td><td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td></tr>)}</tbody></table></div> : <div className="admin-empty-state"><strong>No users found</strong><span>Registered accounts will appear here.</span></div>}
  </section>
}