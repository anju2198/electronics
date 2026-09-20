import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api.js'
import { saveAuth } from '../services/auth.js'

export default function Register() {
  const navigate = useNavigate(); 
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault(); 
    setError('');
    setIsSubmitting(true);
    try {
      const result = await api.register(form);
      saveAuth(result);
      navigate('/login')
    }
    catch (err) {
      setError(err.message);
      setIsSubmitting(false)
    }
  }
  return <section className="auth-page">
    <div className="auth-panel">
      <p className="eyebrow">Join Volt</p>
      <h2>Create your account</h2>
      <p className="auth-subtitle">A better setup starts with the right essentials.</p>
      
      <form onSubmit={submit}><label htmlFor="register-name">Full name</label>
        <input id="register-name" required autoComplete="name" placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        <label htmlFor="register-email">Email address</label>
        <input id="register-email" required autoComplete="email" type="email" placeholder="you@example.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <label htmlFor="register-password">Password</label>
        <input id="register-password" required autoComplete="new-password" type="password" placeholder="Create a password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <label htmlFor="register-role">Account type</label>
        <select id="register-role" required value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={isSubmitting} className="primary-button">{isSubmitting ? 'Creating account...' : 'Create account ↗'}
        </button>{error && <p className="error" role="alert">{error}</p>}
      </form>
      <p className="auth-switch">Already have an account?
        <Link to="/login">Log in</Link>
      </p>
    </div>
    <div className="auth-note">
      <span>02</span>
      <strong>Make room for better everyday gear.</strong>
      <p>Save your favorites and keep every order in one place.</p>
    </div>
  </section>
}
