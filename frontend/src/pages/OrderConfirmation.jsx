import { Link, useLocation } from 'react-router-dom'

export default function OrderConfirmation() {
  const { state } = useLocation()
  const orderId = state?.order?._id || state?.order?.id || 'your new order'
  return <section className="confirmation-page"><span className="confirmation-mark">✓</span><p className="eyebrow">Order confirmed</p><h2>Thank you for your order.</h2><p>We have received order <strong>{orderId}</strong> and will keep you updated as it moves forward.</p><div className="confirmation-actions"><Link className="primary-button" to="/orders">View my orders <span>↗</span></Link><Link className="text-link" to="/products">Continue shopping <span>↗</span></Link></div></section>
}
