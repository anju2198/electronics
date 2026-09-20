import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api.js'
import { saveAuth } from '../services/auth.js'

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const result = await api.login(form);
      saveAuth(result);
      navigate(result.user.role === 'admin' ? '/admin' : '/orders')
    } catch (err) {
      setError(err.message); setIsSubmitting(false)
    }
  }
  return <AuthForm
    title="Welcome back"
    subtitle="Sign in to keep your setup moving." submitLabel="Log in"
    form={form}
    setForm={setForm}
    onSubmit={submit}
    error={error}
    isSubmitting={isSubmitting}
  />
}

function AuthForm({ title, subtitle, submitLabel, form, setForm, onSubmit, error, isSubmitting }) {
  return <section className="auth-page">
    <div className="auth-panel">
      <p className="eyebrow">Volt account</p>
      <h2>{title}</h2>
      <p className="auth-subtitle">{subtitle}</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="login-email">Email address</label>

        <input id="login-email"
          required autoComplete="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <label htmlFor="login-password">Password</label>

        <input id="login-password"
          required autoComplete="current-password"
          type="password"
          placeholder="Enter your password"
          value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        <button type="submit"
          disabled={isSubmitting}
          className="primary-button">{isSubmitting ? 'Signing in...' : `${submitLabel} ↗`} </button>

        {
          error && <p className="error" role="alert">{error}</p>
        }
      </form>
      <p className="auth-switch">New to Volt?
        <Link to="/register">Create an account</Link>
      </p>
    </div>
    <div className="auth-note">
      <span>01</span>
      <strong>Good technology should feel effortless.</strong>
      <p>Curated electronics for the way you work, move, and make.</p>
    </div>
  </section>
}
