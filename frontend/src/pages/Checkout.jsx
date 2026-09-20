import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const defaultForm = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  country: 'United States',
}

export default function Checkout() {
  const { items, total } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(defaultForm)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('volt_token')
    if (!token) {
      setMessage('Please log in before placing an order.')
    }
  }, [])

  const setField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  if (!items.length) {
    return (
      <section className="checkout-page empty-checkout">
        <p className="eyebrow">Your bag</p>
        <h2>Your cart is empty</h2>
        <p>Pick a few essentials before checking out.</p>
        <Link className="primary-button" to="/products">Browse products <span>↗</span></Link>
      </section>
    )
  }

  const submit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('volt_token')

    if (!token) {
      setMessage('Please log in before placing an order.')
      navigate('/login')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      navigate('/payment', { state: { shipping: {
        fullName: form.fullName,
        email: form.email,
        address: form.address,
        city: form.city,
        zip: form.zip,
        country: form.country,
      } } })
    } catch (error) {
      setMessage(error.message || 'Unable to place your order.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="checkout-page">
      <div className="checkout-grid">
        <div className="checkout-panel">
          <p className="eyebrow">Almost there</p>
          <h2>Checkout</h2>

          <form className="checkout-form" onSubmit={submit}>
            <div className="field-row">
              <label>
                Full name
                <input required value={form.fullName} onChange={setField('fullName')} placeholder="Jamie Rivera" />
              </label>
              <label>
                Email
                <input required type="email" value={form.email} onChange={setField('email')} placeholder="you@example.com" />
              </label>
            </div>

            <label>
              Street address
              <input required value={form.address} onChange={setField('address')} placeholder="1488 Orchard Lane" />
            </label>

            <div className="field-row">
              <label>
                City
                <input required value={form.city} onChange={setField('city')} placeholder="Austin" />
              </label>
              <label>
                ZIP code
                <input required value={form.zip} onChange={setField('zip')} placeholder="78701" />
              </label>
            </div>

            <label>
              Country
              <input required value={form.country} onChange={setField('country')} placeholder="United States" />
            </label>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Placing order...' : 'Place order ↗'}
            </button>

            {message && <p className="error">{message}</p>}
          </form>
        </div>

        <aside className="checkout-summary">
          <p className="eyebrow">Order summary</p>
          <h3>{items.reduce((sum, item) => sum + (item.quantity || 1), 0)} item{items.reduce((sum, item) => sum + (item.quantity || 1), 0) > 1 ? 's' : ''}</h3>

          <ul className="summary-list">
            {items.map((item) => (
              <li key={item._id || item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <span>${Number(item.price || 0).toFixed(2)}</span>
                  <span>${Number(item.price || 0).toFixed(2)} × {item.quantity || 1}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="summary-totals">
            <div><span>Subtotal</span><strong>${Number(total || 0).toFixed(2)}</strong></div>
            <div><span>Shipping</span><strong>Free</strong></div>
            <div className="grand-total"><span>Total</span><strong>${Number(total || 0).toFixed(2)}</strong></div>
          </div>
        </aside>
      </div>
    </section>
  )
}
