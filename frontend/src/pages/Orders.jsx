import { useEffect, useState } from 'react'
import { api } from '../services/api.js'

export default function Orders() {
  const [orders, setOrders] = useState([]); const [error, setError] = useState('')
  useEffect(() => { api.getOrders().then(setOrders).catch((err) => setError(err.message)) }, [])
  return <section className="catalog">
    <p className="eyebrow">Your account</p>
    <h2>Orders</h2>
    {error ? <p className="error">{error}</p> : orders.length ? orders.map((order) =>
      <div className="cart-item" key={order._id}>
        <span>Order {order._id}
          <small>{order.status}</small>
        </span>
      </div>
    ) : <p className="cart-empty">No orders yet.</p>
    }
  </section>
}
