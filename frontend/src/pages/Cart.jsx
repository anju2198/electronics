import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, removeItem, total } = useCart()
  return <section className="catalog"><p className="eyebrow">Your selection</p><h2>Your cart</h2>{items.length ? <>{items.map((item) => <div className="cart-item" key={item._id || item.id}><img src={item.image} alt="" /><span>{item.name}<small>${item.price} × {item.quantity || 1}</small></span><button onClick={() => removeItem(item._id || item.id)}>Remove</button></div>)}<h3>Total: ${Number(total).toFixed(2)}</h3><Link className="primary-button" to="/checkout">Continue to checkout ↗</Link></> : <p className="cart-empty">Your cart is empty. <Link to="/products">Browse products</Link></p>}</section>
}
