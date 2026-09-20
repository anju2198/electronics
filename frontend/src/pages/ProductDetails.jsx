import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { api } from '../services/api.js'
import Loader from '../components/Loader.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const { addItem } = useCart()
  const { toggleItem, hasItem } = useWishlist()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCartPopup, setShowCartPopup] = useState(false)
  useEffect(() => {
    setLoading(true)
    setError('')
    api.getProduct(id).then(setProduct).catch((requestError) => { setProduct(null); setError(requestError.message || 'Product not found') }).finally(() => setLoading(false))
  }, [id])
  useEffect(() => {
    if (!showCartPopup) return undefined
    const timeout = setTimeout(() => setShowCartPopup(false), 2200)
    return () => clearTimeout(timeout)
  }, [showCartPopup])
  if (loading) return <Loader />
  if (error || !product) return <section className="catalog empty-state"><p className="eyebrow">Product unavailable</p><h2>{error || 'Product not found'}</h2><Link className="primary-button" to="/products">Back to products <span>↗</span></Link></section>
  const saved = hasItem(product._id || product.id)
  const handleAdd = () => { addItem(product); setShowCartPopup(true) }
  return <section className="catalog product-details"><div className="product-image"><img src={product.image} alt={product.name} /></div><div><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p className="hero-text">{product.description || 'A thoughtfully selected electronic essential for your everyday setup.'}</p><div className="price"><strong>${product.price}</strong></div><div className="product-actions"><button className="primary-button" onClick={handleAdd}>Add to cart <span>↗</span></button><button className="secondary-button" onClick={() => toggleItem(product)}>{saved ? 'Saved to wishlist' : '♡ Save to wishlist'}</button></div>{showCartPopup && <div className="cart-popup" role="status">{product.name} added to cart</div>}</div></section>
}
