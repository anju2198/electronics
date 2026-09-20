import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { api } from '../services/api.js'

export default function Payment() {
  const { items, total, clearCart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const shipping = location.state?.shipping
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!shipping) return <section className="checkout-page empty-checkout"><p className="eyebrow">Payment</p><h2>Checkout details missing</h2><p>Return to checkout to enter your delivery details.</p><Link className="primary-button" to="/checkout">Back to checkout <span>↗</span></Link></section>
  if (!items.length) return <section className="checkout-page empty-checkout"><p className="eyebrow">Payment</p><h2>Your cart is empty</h2><Link className="primary-button" to="/products">Browse products <span>↗</span></Link></section>

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const order = await api.createOrder({ email: shipping.email, items, shippingAddress: shipping })
      clearCart()
      navigate('/order-confirmation', { state: { order } })
    } catch (requestError) {
      setError(requestError.message || 'Unable to place your order.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return <section className="checkout-page"><div className="checkout-grid">
    <div className="checkout-panel"><p className="eyebrow">Step 2 of 2</p><h2>Payment</h2>
      <form className="checkout-form" onSubmit={submit}>
        <label>Card number<input required inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" value={card.number} onChange={(event) => setCard({ ...card, number: event.target.value })} /></label>
        <div className="field-row"><label>Expiry<input required autoComplete="cc-exp" placeholder="MM / YY" value={card.expiry} onChange={(event) => setCard({ ...card, expiry: event.target.value })} /></label><label>CVC<input required inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={card.cvc} onChange={(event) => setCard({ ...card, cvc: event.target.value })} /></label></div>
        <button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Processing...' : `Pay $${Number(total).toFixed(2)} ↗`}</button>
        {error && <p className="error" role="alert">{error}</p>}
      </form>
    </div>
    <aside className="checkout-summary"><p className="eyebrow">Delivering to</p><h3>{shipping.fullName}</h3><p>{shipping.address}, {shipping.city} {shipping.zip}</p><div className="summary-totals"><div><span>Total</span><strong>${Number(total).toFixed(2)}</strong></div></div></aside>
  </div></section>
}
